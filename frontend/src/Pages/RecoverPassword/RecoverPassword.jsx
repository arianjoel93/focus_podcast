//styles
import "./RecoverPassword.scss"
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';

import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';



//assets
import google from "../../assets/images/google.png"
import { Password } from 'primereact/password';
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import Error from "../../components/molecules/Error/Error";

const RecoverPassword = () => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState({})
    const [active, setActive] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if ([email].includes('')) {
            setError({
                msg: 'Debes llenar el campo para continuar',
                error: true
            })
            setActive(true)
            return
        }

        if (!emailRegex.test(email)) {
            setError({
                msg: 'El correo no es correcto',
                error: true
            })
            setActive(false)
            return
        }

        setError({})

        try {

            const { data } = await axios.post('http://localhost:4000/api/users/recover-password', { email })
            setError(
                {
                    msg: data.msg,
                    error: false
                })

        } catch (error) {
            setError(
                {
                    msg: error.response.data.msg,
                    error: true
                })
        }
    }

    const { msg } = error


    return (
        <div className='RecoverPassword'>
            <div className='content'>
                <div className="title">
                    <h1>Recuperar contraseña de</h1>
                    <h2><span className="B">F</span><span className="gradient1">ocus</span><span className="P">P</span><span className="gradient2">odcasts</span></h2>
                </div>
                <div className="errors">
                    {msg && <Error error={error} />}
                </div>
                <form onSubmit={handleSubmit} className="form">
                    <div className="info">
                        <label>Email</label>
                        <InputText className={active && email == '' && "p-invalid"} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="info">
                        <Button label="Enviar instrucciones" type="submit" />
                    </div>
                </form>
                <Link to={"/login"}>
                    <button className="forgotPasswod">Iniciar sesión</button>
                </Link>
                <Divider />
                <h4 className="noUser">¿No tienes cuenta?
                    <a href="/register">
                        <button>Regístrate en FocusPodcast</button>
                    </a>
                </h4>
            </div>
        </div>
    )
}

export default RecoverPassword