import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Guest from "../Routes/Guest/Guest"
import Auth from "../Routes/Auth/Auth"
import "./MainRouter.scss"
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css'; 

const MainRouter = () => {
  return (
    <BrowserRouter>
      {/* <Guest></Guest> */}
      <Auth></Auth>
    </BrowserRouter>
  )
}

export default MainRouter