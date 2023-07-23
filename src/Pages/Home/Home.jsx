//styles
import "./Home.scss"

//assets
import givone from "../../assets/images/givone.png"
import { Link } from "react-router-dom"
import { useStateContext } from "../../context/ContextProvider"
import { useEffect } from "react"

const Home = () => {


    const { pathname, setPathname, setBackgroundImage } = useStateContext()
    useEffect(() => {
        setPathname(window.location.pathname)
    }, [])

    const handleClick = () => {
        setBackgroundImage(givone)
        console.log("aqui ando")
    }

    return (
        <div className="Home Container">
            <section className="section_1">
                <div className="cover">
                    <h1>Los Podcasts más populares</h1>
                    <div className="image">
                        <div className="opacity">
                            <Link to={'/author/1'} className="circle" onClick={() => handleClick()}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M9 6l6 6l-6 6" />
                                </svg>
                            </Link>
                        </div>
                        <img src={givone} />
                    </div>
                    <p>Dr. Givone</p>
                </div>
            </section>
        </div>
    )
}
export default Home