import { useEffect, useRef, useState } from "react";
import "./Clips.scss"
import { Howl, Howler } from 'howler';
import { Slider } from 'primereact/slider';
import { useStateContext } from "../../../context/ContextProvider";
import Player from "../Player/Player";

const Clips = (
    { cover, podcast, index }
) => {
    const { setActive, setInd, setPodcastPlaying } = useStateContext()
    const soundRef = useRef(null);
    const [durationTime, setDurationTime] = useState(0)
    const [second, setSecond] = useState()
    const [minutes, setMinutes] = useState(0)
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const interval = useRef(null);
    const [player, setPlayer] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)


    useEffect(() => {
        const sound = new Howl({
            src: [podcast],
            html5: true,
            onload: () => {
                var duration = sound.duration()
                setDurationTime(duration)
                setMinutes(Math.floor(duration / 60))
                setSecond(Math.floor(duration % 60))
            }
        });
        setPlayer(sound);

        soundRef.current = sound;

        return () => {
            sound.unload();
        };

    }, []);



    // const togglePlay = () => {
    //     setActive(true)
    //     if (player) {
    //         if (isPlaying) {
    //             player.pause();
    //         } else {
    //             player.play();
    //         }
    //     }
    // };

    const handleClick = (index) => {
        setActive(true)
        setPodcastPlaying(podcast)
    }

    return (
        <>
            <div className="clips">
                <div className="coverClips" >
                    <img src={cover} />
                </div>
                <div className="infoClips">
                    <strong>11-01-2023</strong>
                    <h3>Procesos de mesoescala en el Golfo de California</h3>
                    <p>In sed malesuada metus.
                        Nulla facilisi. In venenatis aliquet magna, non ultricies nibh
                        pellentesque at.Curabitur volutpat ante eros, id scelerisque quam cursus at.
                        Proin consequat, nibh ac commodo eleifend, dolor risus egestas
                        lacus, ut auctor odio justo id massa.</p>
                </div>
                <div className="actions">
                    <button className="playActions" onClick={() => handleClick(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 4v16l13 -8z" />
                        </svg>
                    </button>
                    {minutes == 0 ? <p>{second} seg</p> : <p>{minutes} min</p>}
                </div>
            </div>
            {/* {active &&
                <aside className="menuPlayer">
                    <Slider className="Container" value={progress} onChange={(e) => setProgress(e.value)} />
                    <div className="Container">
                        <div className="controlerTime Container" style={{ width: `${progress}%`, height: '2px', backgroundColor: 'transparent', marginTop: '-2px' }}>
                            <div className="content">
                                <p> {time?.hours.toString().padStart(2, '0')}:{time?.minutes.toString().padStart(2, '0')}:{time?.seconds.toString().padStart(2, '0')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="containerPlayer Container">
                        <div className="info">
                            <h3>Procesos de mesoescala en el Golfo de California</h3>
                            <span>Joel Trincado</span>
                        </div>
                        <div className="actionsPlayer">
                            <button className="action prev">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-skip-back" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M20 5v14l-12 -7z" />
                                    <path d="M4 5l0 14" />
                                </svg>
                            </button>
                            <button className="action play" onClick={togglePlay}>
                                {
                                    isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-pause" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                                        <path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                                    </svg> :
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M7 4v16l13 -8z" />
                                        </svg>
                                }
                            </button>
                            <button className="action next">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-skip-back" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M20 5v14l-12 -7z" />
                                    <path d="M4 5l0 14" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </aside>
            } */}
        </>
    )
}

export default Clips