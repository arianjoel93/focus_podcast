import { useEffect, useState } from "react"
import "./ConfirmUser.scss"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Error from "../../components/molecules/Error/Error"
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';

const ConfirmUser = () => {
    const [error, setError] = useState({})
    const [userConfirmed, setUserConfirmed] = useState(false)
    const params = useParams()
    const { token } = params

    useEffect(() => {
        confirmUser()
    }, [])

    const confirmUser = async () => {
        try {
            const url = `http://localhost:4000/api/users/confirm/${token}`
            const { data } = await axios.get(url)

            setError({
                msg: data.msg,
                error: false
            })
            setUserConfirmed(true)

        } catch (error) {
            setError({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = error

    return (
        <div className='ConfirmUser'>
            {msg && !userConfirmed &&
                <>
                    <div className="logoPodcast">
                        <h1>Confirma tu cuenta y accede a</h1>
                        <h2><span className="B">F</span><span className="gradient1">ocus</span><span className="P">P</span><span className="gradient2">odcasts</span></h2>
                    </div>
                    <Error error={error} width='500px' />
                </>
            }
            {
                userConfirmed &&
                <>
                    <div className="logoPodcast">
                        <h1>Cuenta confirmada con éxito. Ya puedes acceder a</h1>
                        <h2><span className="B">F</span><span className="gradient1">ocus</span><span className="P">P</span><span className="gradient2">odcasts</span></h2>
                    </div>
                    <Link to={"/login"} className="info"><Button label="Iniciar sesión" /></Link>
                </>
            }

        </div>
    )
}

export default ConfirmUser