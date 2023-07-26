import { useEffect, useState } from "react"
import { useStateContext } from "../../context/ContextProvider"
import "./PlayPause.scss"

const PlayPause = ({ podcast, index }) => {
    const { setActive, setPodcastPlaying, audioState, setAudioPlayingById, time } = useStateContext()
    const dashArray = 75 * Math.PI * 2
    const dashOffSet = dashArray - (dashArray * time) / 100

    const handleClick = (index) => {
        setActive(true)
        setPodcastPlaying(podcast)
        // setAudioPlayingById(podcast, !audioState[podcast]?.isPlaying);

        const currentAudioState = audioState[podcast]?.isPlaying;
        // Pausar el audio actualmente en reproducción (si lo hay)
        Object.keys(audioState).forEach((url) => {
            if (url !== podcast && audioState[url]?.isPlaying) {
                setAudioPlayingById(url, false);
            }
        });

        // Iniciar o pausar el audio actual
        setAudioPlayingById(podcast, !currentAudioState);
    }


    return (
        <div className="btnControl">
            {audioState[podcast] &&
                <svg id={"btnControl"} width={50} height={50} viewBox="0 0 200 200" className="svgCircle">
                    <circle cx={200 / 2} cy={200 / 2} strokeWidth={"15px"} r={75} className="circle-background"></circle>
                    <circle cx={200 / 2} cy={200 / 2} strokeWidth={"20px"} r={75} className="circle-progress" style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffSet }} transform={'rotate(-90 100 100)'}></circle>
                </svg>
            }

            <button className="playActions" onClick={() => handleClick(index)} id={"playActions"}>
                {audioState[podcast]?.isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-pause" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                    <path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 4v16l13 -8z" />
                </svg>}

            </button>
        </div>
    )
}

export default PlayPause