// styles
import "./HeaderMobile.scss"

//assets
import logo from "../../../assets/logo/bp2.png"
import user from "../../../assets/icons/user.png"

//react
import { InputText } from 'primereact/inputtext';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef, useState } from 'react'
import { Link } from "react-router-dom";

const HeaderMobile = () => {
    const op = useRef(null)
    const [activeSearch, setActiveSearch] = useState(false)
    return (
        <div className='maxWidth HeaderMobile'>
            {
                activeSearch ? (
                    <div className="searcher">
                        <InputText placeholder="Buscar" />
                        <button className="close" onClick={() => setActiveSearch(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M18 6l-12 12" />
                                <path d="M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <>
                        <Link className="logo" to={"/"}>
                            <img src={logo} />
                            <h2><span className="B">F</span><span className="gradient1">ocus</span><span className="P">P</span><span className="gradient2">odcasts</span></h2>
                        </Link>
                        <div className="rightHeader">
                            <button className="search" onClick={() => { setActiveSearch(true) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="28" height="28" viewBox="0 0 24 24" stroke-width="2.0" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                    <path d="M21 21l-6 -6" />
                                </svg>
                            </button>
                            <button className="cUser" onClick={(e) => op.current.toggle(e)}>
                                <img src={user} />
                            </button>
                            <OverlayPanel ref={op}>
                                <div className="menUser">
                                    <div className="setting top">Mi cuenta</div>
                                    <div className="setting bottom">Salir</div>
                                </div>
                            </OverlayPanel>

                        </div>
                    </>
                )
            }

        </div >
    )
}

export default HeaderMobile