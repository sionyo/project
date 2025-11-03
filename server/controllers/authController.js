const User = require('../models/User');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
    
        if(!name || !email || !password) {
            return res.status(400).json({
                success:false,
                message: 'please provide name, email, and password'
            });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'please provide a valid email'
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'password must at least be 6 characters'
            })
        }
        const exsistingUser = await User.findOne({email});
        if(exsistingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exsists'
            })
        }
        const user = await User.create({
            name,
            email,
            password
        })
        
        const token = generateToken(user._id);
        
        res.status(201).json({
            success: true,
            message: 'user registerd successfully',
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'server error during registration',
            error: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success:false,
                message: 'please provide email and password'
            })
        } 
        
        const user = await User.findOne({email}).select('+password');
        if(!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success:false,
                message: 'Invalid email or password'
            })
        }
        const token = generateToken(user._id);
        res.status(200).json({
            success:true,
            message:'login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch(error) {
        res.status(500).json({
            sucess: false,
            message: 'server error during login',
            error: error.message
        })
    }
}

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json({
            success:true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        })
    }
}

module.exports = {register, login, getMe}