import "./Register.scss"
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';


//assets
import logo from "../../assets/logo/bp2.png"
import google from "../../assets/images/google.png"
import { useState } from "react";
import { postAxiosUser } from "../../api/UsersAxios";
import axios from "axios";
import Error from "../../components/molecules/Error/Error";

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordR, setPasswordR] = useState('')
    const [error, setError] = useState({})
    const [active, setActive] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if ([name, email, password, passwordR].includes('')) {
            console.log('Hola')
            setError({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setActive(true)
            return
        }
        if (password !== passwordR) {
            setError({
                msg: 'Las contraseñas no coinciden',
                error: true
            })
            setActive(false)
            return
        }

        if (password.length < 6) {
            setError({
                msg: 'La contraseña debe tener al menos 6 caracteres',
                error: true
            })
            setActive(false)
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
            const { data } = await axios.post('http://localhost:4000/api/users', { name, email, password })
            setError(
                {
                    msg: data.msg,
                    error: false
                })
            setName('')
            setEmail('')
            setPassword('')
            setPasswordR('')
            setActive(false)
        } catch (error) {
            setError(
                {
                    msg: error.response.data.msg,
                    error: true
                })
        }
    };


    return (
        <div className='Register'>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <img className="logo" src={logo} />
                    <div className="title">
                        <h1>Regístrate en</h1>
                        <h2><span className="B">F</span><span className="gradient1">ocus</span><span className="P">P</span><span className="gradient2">odcasts</span></h2>
                    </div>
                    <button className="googleInit">
                        <img src={google} />
                        Registrarte con Google
                    </button>
                    <Error error={error} />
                    <div className="info">
                        <label>Nombre</label>
                        <InputText placeholder="Nombre" className={active && name == '' && "p-invalid"} value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="info">
                        <label>Correo electrónico</label>
                        <InputText placeholder="Correo electrónico" className={active && email == '' && "p-invalid"} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="info">
                        <label>Contraseña</label>
                        <Password toggleMask placeholder="Contraseña" className={active && password == '' && "p-invalid"} value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} />
                    </div>
                    <div className="info">
                        <label>Repetir contraseña</label>
                        <Password toggleMask placeholder="Contraseña" className={active && passwordR == '' && "p-invalid"} value={passwordR} onChange={(e) => setPasswordR(e.target.value)} feedback={false} />
                    </div>
                    <p>Al hacer clic en Registrarte, aceptas los Términos y condiciones de uso de FocusPodcast.</p>
                    <p>
                        Para obtener más información acerca de cómo FocusPodcast recopila, utiliza, comparte y protege
                        tus datos personales, consulta la Política de privacidad de FocusPodcast.
                    </p>
                    <div className="info">
                        <Button label="Regístrate" type="submit" />
                    </div>

                </div>
            </form>
            <h4 className="noUser">¿Ya tienes cuenta?
                <a href="/login">
                    <button>Inicia sesión</button>
                </a>
            </h4>
        </div>
    )
}

export default Register