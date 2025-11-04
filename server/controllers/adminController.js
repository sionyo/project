const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateAdminToken = (adminId) => {
    return jwt.sign({adminId}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE})
}

const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'please provide email and password'
            })
        }

        const token = generateAdminToken('admin')

        res.status(200).json({
            success:true,
            message: 'Admin login successful',
            token,
            admin: {
                id: 'admin',
                email: process.env.ADMIN_EMAIL
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error during admin login',
            error: error.message
        })
    }
}

const getAdminProfile = async (req, res) => {
    try {
        res.status(200).json({
            success:true,
            admin: {
                id: 'admin',
                email: process.env.ADMIN_EMAIL
            }
        })
    } catch(error) {
        res.status(500).json({
            success:false,
            message: 'server error',
            error: error.message
        })
    }
}

module.exports = {adminLogin, getAdminProfile}
