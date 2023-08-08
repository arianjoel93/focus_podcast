//styles
import "./Login.scss"
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

const Login = () => {

    const [user, setUser] = useState()
    const [password, setPassword] = useState()

    return (
        <div className='Login'>
            <div className='content'>
                <div className="title">
                    <h1>Inicia sesión en</h1>
                    <h2><span className="B">F</span><span className="gradient1">ocus</span><span className="P">P</span><span className="gradient2">odcasts</span></h2>
                </div>
                <button className="googleInit">
                    <img src={google} />
                    Continuar con Google
                </button>
                <Divider />
                <div className="errors"></div>
                <div className="form">
                    <div className="info">
                        <label>Email</label>
                        <InputText value={user} onChange={(e) => setUser(e.target.value)} />
                    </div>
                    <div className="info">
                        <label>Contraseña</label>
                        <Password value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} />
                    </div>
                    <div className="info">
                        <Button label="Iniciar sesión" />
                    </div>
                    <Link to={"/recover-password"}>
                        <button className="forgotPasswod">¿Has olvidado tu contraseña?</button>
                    </Link>
                    <Divider />
                    <h4 className="noUser">¿No tienes cuenta?
                        <a href="/register">
                            <button>Regístrate en FocusPodcast</button>
                        </a>
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default Login