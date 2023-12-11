const express = require(`express`)
const router = new express.Router()
const userControl = require('../Controller/userController')
const jwtMiddleware = require('../Controller/Middlewares/jwtMiddleware')
const projectController = require('../Controller/projectController')
const multerConfig = require('../Controller/Middlewares/multerMiddleware')

// register Api
router.post('/user/registration', userControl.register)

router.post(`/user/login`,userControl.login)


// add-project
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)

// getUser Project
router.get(`/user/projects`,jwtMiddleware,projectController.allUserProjects)



// getAll projeects
router.get('/all/projects',jwtMiddleware,projectController.getallProjects)


// getHome projects

router.get('/home/projects',projectController.getHomeProjects)


// editProject

router.put('/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProjectController)


// delete project
router.delete('/delete/:id',jwtMiddleware,projectController.deleteProject)

// edit user
router.put('/user/edit',jwtMiddleware,multerConfig.single("profileImage"),userControl.editUser)

module.exports = router