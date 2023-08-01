// styles
import "./Header.scss"

//assets
import logo from "../../../assets/logo/bp3.png"
import user from "../../../assets/icons/user.png"

//react
import { InputText } from 'primereact/inputtext';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef } from 'react'
import { Link } from "react-router-dom";
import HeaderMobile from "../HeaderMobile/HeaderMobile";

const Header = () => {
    const op = useRef(null);
    const screen = window.screen.width
    return (
        <header className="headerMain">
            {
                screen > 768 ?
                    (
                        <div className="maxWidth container">
                            <Link className="logoPodcast" to={"/"}>
                                <img src={logo} />
                                <h2><span className="B">F</span><span className="gradient1">ocus</span><span className="P">P</span><span className="gradient2">odcasts</span></h2>
                            </Link>
                            <div className="right">
                                <InputText placeholder={"Buscar podcast"} />
                                <div className="cUser" onClick={(e) => op.current.toggle(e)}>
                                    <img src={user} />
                                </div>
                                <OverlayPanel ref={op}>
                                    <div className="menUser">
                                        <div className="setting top">Mi cuenta</div>
                                        <div className="setting bottom">Salir</div>
                                    </div>
                                </OverlayPanel>
                            </div>
                        </div>
                    ) : (
                        <HeaderMobile />
                    )
            }
        </header>
    )
}

export default Header