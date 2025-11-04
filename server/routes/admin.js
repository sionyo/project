const express = require('express')
const {adminLogin, getAdminProfile} = require('../controllers/adminController')
const { getAllUsers, getUserById, deleteUser} = require('../controllers/adminUserController')
const {adminProtect} = require('../middleware/adminAuth')

const router = express.Router()
router.post('/login', adminLogin)
router.get('/profile', adminProtect, getAdminProfile)

//user managementRoutes
router.get('/users', adminProtect, getAllUsers)
router.get('/user/:id', adminProtect, getUserById)
router.delete('/users/:id', adminProtect, deleteUser)

module.exports = router