//styels
import "./Layout.scss"

//components
// import Header from '../Header/Header'
// import Footer from '../Footer/Footer'
// import Cookies from "../Cookies/Cookies";

//react
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';


//react
import { Outlet } from 'react-router-dom'
import Header from "../Header/Header";
import { useStateContext } from "../../../context/ContextProvider";


const Layout = () => {
    const { pathname } = useStateContext()

    return (
        <div className='Layout'>
            <Header />
            <main className='containerMain Container' id="containerMain" style={pathname.includes('author') ? { background: 'linear-gradient(to right, rgb(33 43 49), rgb(18 22 24))', } : { background: 'transparent' }}>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout