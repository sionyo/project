const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateAdminToken = (adminId) => {
    return jwt.sign({adminId}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE})
}

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      })
    }

    //FIX: Properly check against .env credentials
    const isEmailValid = email === process.env.ADMIN_EMAIL;
    const isPasswordValid = password === process.env.ADMIN_PASSWORD;

    if (!isEmailValid || !isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      })
    }

    const token = jwt.sign({ adminId: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    })

    res.status(200).json({
      success: true,
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
      message: 'Server error during admin login',
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
