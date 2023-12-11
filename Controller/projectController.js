const projects = require("../Models/projectSchema")



// addProjects
exports.addProjects = async (req,res)=>{
    const userId = req.payload
    const projectImage =  req.file.filename
    const { title,language,overview,github,website } = req.body


    try {
        const existingProject =  await projects.findOne({github})
        if(existingProject){
            res.status(406).json(`project already exist upload another`)
        } else {
            const newproject = new projects({
                title,language,overview,github,website,projectImage,userId
            })
            await newproject.save()
            res.status(200).json(newproject)
        }
    } catch (error) {
        res.status(401).json({ message: "Request failed", error: error });

    }


}


// getUser Project - token required

exports.allUserProjects = async (req,res)=>{
    const userId = req.payload
    try {
        const userProject = await projects.find({userId})
        res.status(200).json(userProject)
    } catch (error) {
        res.status(401).json(error)
    }
}



// getAll projects - token required

exports.getallProjects = async (req,res)=>{
    const searchKey = req.query.search
    const query = {
        language:{$regex:searchKey , $options:"i"}
        }
    try {
        const allProjects =  await projects.find(query)
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}






// gethomeProjects \

exports.getHomeProjects = async (req,res)=>{
    try {
        const homeprojects  = await projects.find().limit(3)
        res.status(200).json(homeprojects)
    } catch (error) {
        res.status(401).json(error)
    }
}


// edit project
exports.editProjectController = async (req,res)=>{
    // project id
    const {id}= req.params
    const userId = req.payload
    const {title,language,overview,github,website,projectImage} = req.body
    const uploadProjectImage = req.file?req.file.filename:projectImage

    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{
            title,language,overview,github,website,projectImage:uploadProjectImage,userId
        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    } catch (error) {
        res.status(401).json(error)
    }
}


// delete Project
exports.deleteProject =  async(req,res)=>{
    const {id} = req.params
    try {
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    } catch (error) {
        res.status(401).json(error)

    }
}

