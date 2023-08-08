import nodemailer from "nodemailer"

export const emailRegister = async (datos) => {
    const { email, name, token } = datos

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "5b118368ef476b",
            pass: "378f5de85d9049"
        }
    });

    //information of email
    const info = await transport.sendMail({
        from: '"FocusPodcast" <cuentas@focuspodcast.com>',
        to: email,
        subject: "FocusPodcast - Confirma tu cuenta",
        text: "Comprueba tu cuenta en FocusPodcast",
        html:
            `
        <p>Hola: ${name}. Comprueba tu cuenta en FocusPodcast</p> 
        <p>Tu cuenta está casi lista, solo debes comprobarla en el siguiente enlace: <a href="http://localhost:3000/confirm/${token}">Comprobar cuenta</a></p>

        `
    })
}

export const emailRecoverPass = async (datos) => {
    const { email, name, token } = datos

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "5b118368ef476b",
            pass: "378f5de85d9049"
        }
    });

    //information of email
    const info = await transport.sendMail({
        from: '"FocusPodcast" <cuentas@focuspodcast.com>',
        to: email,
        subject: "FocusPodcast - Recuperar contraseña",
        text: "Recupera la contraseña de tu cuenta en FocusPodcast",
        html:
            `
        <p>Hola: ${name}. Recupera la contraseña de tu cuenta en FocusPodcast</p> 
        <p>Solo debes comprobarla en el siguiente enlace: <a href="http://localhost:3000/recover-password/${token}">Recuperar contraseña</a></p>

        `
    })
}