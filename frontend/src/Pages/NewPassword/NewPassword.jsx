//styles
import "./NewPassword.scss"
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';


import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';



//assets
import google from "../../assets/images/google.png"
import { Password } from 'primereact/password';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"
import Error from "../../components/molecules/Error/Error";

const NewPassword = () => {
  const params = useParams()
  const { token } = params
  const [pass, setPass] = useState('')
  const [error, setError] = useState({})
  const [active, setActive] = useState(false)

  useEffect(() => {
    const checkToken = async () => {

      try {
        const { data } = await axios.get(`http://localhost:4000/api/users/recover-password/${token}`)

      } catch (error) {
        setError(
          {
            msg: error.response.data.msg,
            error: true
          })
      }

    }
    checkToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();


    if ([pass].includes('')) {
      setError({
        msg: 'Debes llenar el campo para continuar',
        error: true
      })
      setActive(true)
      return
    }

    if (pass.length < 6) {
      setError({
        msg: 'La contraseña debe tener al menos 6 caracteres',
        error: true
      })
      setActive(true)
      return
    }

    setError({})

    try {

      const { data } = await axios.post(`http://localhost:4000/api/users/recover-password/${token}`, { password: pass, token: token })
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
    <div className='NewPassword'>
      <div className='content'>
        <h1>Recuperar contraseña de FocusPodcast</h1>
        <div className="errors">
          {msg && <Error error={error} />}
        </div>
        {msg == 'Contraseña actualizada' ? (
          <Link to={"/login"} className="info">
            <Button label="Iniciar sesión" />
          </Link>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            <div className="info">
              <label>Nueva contraseña</label>
              <Password toggleMask placeholder=" Nueva Contraseña" className={active && pass == '' && "p-invalid"} value={pass} onChange={(e) => setPass(e.target.value)} />
            </div>
            <div className="info">
              <Button label="Guardar contraseña" type="submit" />
            </div>
          </form>
        )}

      </div>
    </div>
  )
}

export default NewPassword