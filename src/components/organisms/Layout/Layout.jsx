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
// import ScrollButton from "../../atoms/ScrollButton/ScrollButton";
// import { useStateContext } from "../../../context/ContextProvider";

const Layout = () => {
  

    // const {
    //     viewCookies,
    // } = useStateContext();
    return (
        <div className='Layout'>
            {/* {!viewCookies &&
                <Cookies />
            } */}
            <Header />
            <main className='containerMain' id="containerMain">
                {/* <ScrollButton id={"containerMain"} /> */}

                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    )
}

export default Layout