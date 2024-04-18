const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        trim: true,
        required: [true, 'A user must have a firstName '],
        maxlength:32,
    },
    lastName:{
        type: String,
        trim: true,
        required: [true, 'A user must have a lastName '],
        maxlength:32,
    },
    email:{
        type: String,
        trim: true,
        required: [true, 'A user must have email '],
        unique: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
        'Please fill a valid email address'
        ]
    },
    password:{
        type: String,
        required: [true, 'A user must have a password'],
        minlength: 6,
        maxlength: 25,
    },
    role:{
        type: Number,
        default: 0,
        required: [true, 'A user must have a role'],
    }
},
{
    timestamps: true
})

//encrypt the passwords
userSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// compare the password against the entred one
userSchema.methods.comparePassword = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword, this.password)
}


//return JWT token

userSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}


module.exports = mongoose.model("User", userSchema);