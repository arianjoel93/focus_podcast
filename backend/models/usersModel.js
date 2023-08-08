import mongoose from "mongoose";
import bcrypt from "bcrypt"

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,

    },
    confirmed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

usersSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//check password

usersSchema.methods.checkPassword = async function (password) {

    return await bcrypt.compare(password, this.password)

}
const User = mongoose.model("User", usersSchema)

export default User