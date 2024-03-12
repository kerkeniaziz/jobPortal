const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
module.exports = mongoose.model("User", userSchema);