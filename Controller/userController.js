const users = require("../Models/userSchema")
const jwt = require('jsonwebtoken')


exports.register = async (req,res)=>{
console.log("inside register controller");
const {username,email,password} = req.body
try {
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json("Account already exist please login...")
    }else{
        const newUser = new users({
            username,email,password,github:"",linkedin:"",profile:""
        })
    await newUser.save()
    res.status(200).json(newUser)
}
}catch (error) {
    res.status(401).json(`Register Api failed , Error :${error}`) 
}
}









// login
exports.login = async(req,res)=>{
    console.log("inside login function");
    const { email,password} = req.body
    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"supersecretket12345")
            res.status(200).json({
                existingUser,token
            })
        
        }else{
            res.status(404).json("incorrect Email and password")
        }
    } catch (error) {
        res.status(401).json(`Login Api failed , Error :${error}`) 

    }
}

exports.editUser  = async(req,res)=>{

    const userId = req.payload
    const {username,email,password,github,linkedin,profile} = req.body
    const uploadImage = req.file?req.file.filename:profile
    try{
            const updateUser = await users.findByIdAndUpdate({_id:userId},{
                username,email,password,github,linkedin,profile:uploadImage
            },{new:true})
            await updateUser.save()
            res.status(200).json(updateUser)
    }catch(err){
            res.status(401).json(err)
    }
}