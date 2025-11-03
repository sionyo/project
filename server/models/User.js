const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'provide a name'],
        maxlength: [50, 'name can not be more than 50 charachters']
    },
    email: {
        type:String,
        required: [true, 'please provide an email'],
        unique:true,
        lowerCase:true,
        validate:[validator.isEmail, 'please provide a valid email']
    },
    password: {
        type:String,
        required:true,
        minlength:6,
        select:false
    }
}, {
    timestamps: true
})


//hash password before saving
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

//compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password)
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model('User', userSchema)