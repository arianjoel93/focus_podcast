import User from "../models/usersModel.js"
import generateJWT from "../helpers/generateJWT.js"
import generateID from "../helpers/generateID.js"
import { emailRegister, emailRecoverPass } from "../helpers/email.js"


//create User
const register = async (req, res) => {

    //destructure
    const { email } = req.body

    //heck that the email does not exist
    const userCreated = await User.findOne({ email })

    //If it exists we send a response to the fornt with "User is already registered"
    if (userCreated) {
        const error = new Error("El usuario ya está registrado")
        return res.status(400).json({ msg: error.message })
    }
    //stored the user if it does not exist in the database
    try {
        const user = new User(req.body)
        user.token = generateID()
        await user.save()

        //send email
        emailRegister({
            email: user.email,
            token: user.token,
            name: user.name
        })
        res.json({ msg: "Usuario creado correctamente, revisa tu Email para configurar tu cuenta" })

    } catch (error) {
        console.log(`Error: ${error.message}`)
    }

}


//login
const authenticate = async (req, res) => {

    //destructure
    const { email, password } = req.body

    //Check that the user exists
    const user = await User.findOne({ email })

    //check if the user exists
    if (!user) {
        const error = new Error("El usuario no existe")
        return res.status(404).json({ msg: error.message })
    }

    //check if the user is confirm
    if (!user.confirmed) {
        const error = new Error("Tu cuenta no está confirmada")
        return res.status(403).json({ msg: error.message })
    }

    //Check password
    if (await user.checkPassword(password)) {
        res.json({
            _id: user.id,
            name: user.name,
            user: user.email,
            token: generateJWT(user._id)
        })
    } else {
        const error = new Error("Password incorreto00")
        return res.status(403).json({ msg: error.message })
    }
}


//Token confirm user
const confirm = async (req, res) => {
    const { token } = req.params

    const userConfirm = await User.findOne({ token })

    if (!userConfirm) {
        const error = new Error("Token no válido")
        return res.status(403).json({ msg: error.message })
    }

    try {
        userConfirm.confirmed = true
        userConfirm.token = ""
        await userConfirm.save()
        res.json({ msg: "Usuario confirmado correctamente" })
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

const recoverPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        const error = new Error('Usuario no existe')
        return res.status(404).json({ msg: error.message })
    }

    try {
        user.token = generateID()
        await user.save()

        //send email
        emailRecoverPass({
            email: user.email,
            token: user.token,
            name: user.name
        })

        res.json({ msg: "Hemos enviado un email con las instrucciones" })

    } catch (error) {
        console.log(error.message)
    }

}

const checkToken = async (req, res) => {
    const { token } = req.params

    const validateToken = await User.findOne({ token })

    if (!validateToken) {
        const error = new Error("El token es incorrecto")

        return res.status(403).json({ msg: error.message })
    } else {
        res.json({ msg: "Token válido y el usuario existe" })
    }
}

const newPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const validateToken = await User.findOne({ token })

    if (validateToken) {
        validateToken.password = password
        validateToken.token = ""

        try {
            await validateToken.save()
            res.json({ msg: "Contraseña actualizada" })
        } catch (error) {
            console.log(error.message)
        }
    } else {
        const error = new Error("El token es incorrecto")
        return res.status(403).json({ error })
    }
}

const profile = async (req, res) => {
    const { user } = req

    res.json(user)
}




export {
    register, authenticate, confirm, recoverPassword, checkToken, newPassword, profile
}