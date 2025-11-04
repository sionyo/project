const express = require('express')
const {adminLogin, getAdminProfile} = require('../controllers/adminController')
const {adminProtect} = require('../middleware/adminAuth')

const router = express.Router()
router.post('/login', adminLogin)
router.get('/profile', adminProtect, getAdminProfile)

module.exports = router