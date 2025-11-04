const User = require('../models/User')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1})
        res.status(200).json({
            success: true,
            count: users.length,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if(!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
        res.status(200).json({
            success:true,
            user
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            return res.status(404).json({
                success:false,
                message: 'User not found'
            })
        }
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            message: 'User deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting User',
            error: error.message
        })
    }
}

module.exports = { getAllUsers, getUserById, deleteUser }