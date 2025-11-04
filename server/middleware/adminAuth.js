const jwt = require('jsonwebtoken')

const adminProtect = async (req, res, next) => {
    try {
        let token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split('')[1]
        }
        if (!token) {
            return res.status(401).json({
                success:false,
                message: 'Not authorized to access this admin route'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.adminId !== 'admin') {
            return res.status(401).json({
                success:false,
                message: 'Not authorized to access this admin route'
            })
        }

        req.admin = {id: decoded.adminId, email: process.env.ADMIN_EMAIL}
        next();
    } catch(error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this admin route'
        })
    }
}

module.exports = { adminProtect }