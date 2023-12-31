//styles
import "./Author.scss"
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';

//assets
import givone from "../../assets/images/givone.png"
import replay from "../../assets/icons/replay15.png"

//audio
import podcast from "../../assets/mp3/podcast.mp3"
import podcast1 from "../../assets/mp3/podcast1.mp3"
import podcast2 from "../../assets/mp3/podcast2.mp3"


//react
import Clips from "../../components/molecules/Clips/Clips";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import AudioPlayer from "../../components/organisms/Player/Player";
import styled from 'styled-components';

const AppWrapper = styled.div`
  text-align: center;
`;

const PlayPauseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin: 0 10px;
`;

const TimeSlider = styled.input`
  width: 100%;
`;


const Author = () => {
    const { active, pathname, setPathname, podcastPlaying } = useStateContext()
    const ArrayPodcasts = [
        podcast,
        podcast1,
        podcast2
    ]
    const [like, setLike] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        setPathname(window.location.pathname)
    }, [])
    return (
        <div className='Author'>
            <div className="container Container">
                <div className="cover">
                    <div className="image">
                        <img src={givone} />
                    </div>
                    <div className="info">
                        <h1>Lo más profundo de la oceanografía</h1>
                        <div className="author">
                            <span>Joel Trincado</span>
                        </div>
                        <div className="share">
                            {!like ? (<button className="follow" onClick={() => setLike(!like)}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                </svg>
                                Me gusta
                            </button>) : (
                                <button className="follow pink" onClick={() => setLike(!like)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                    </svg>
                                    Me gusta
                                </button>
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg" class="iconShare icon icon-tabler icon-tabler-share" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                <path d="M8.7 10.7l6.6 -3.4" />
                                <path d="M8.7 13.3l6.6 3.4" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="description">
                    <p>
                        Curabitur volutpat ante eros, id scelerisque quam cursus at.
                        Proin consequat, nibh ac commodo eleifend, dolor risus egestas
                        lacus, ut auctor odio justo id massa. In sed malesuada metus.
                        Nulla facilisi. In venenatis aliquet magna, non ultricies nibh
                        pellentesque at.
                    </p>
                </div>
                {ArrayPodcasts.map((podcast, index) => {
                    return (
                        <Clips array={ArrayPodcasts} podcast={podcast} cover={givone} index={index} />
                    )
                })}
                {active && <AudioPlayer  title={"Mi canción"} audioUrl={podcastPlaying} />}
            </div>
        </div>
    )
}

export default Author