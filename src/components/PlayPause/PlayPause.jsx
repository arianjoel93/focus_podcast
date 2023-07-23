import { useEffect, useState } from "react"
import { useStateContext } from "../../context/ContextProvider"
import "./PlayPause.scss"

const PlayPause = ({ podcast, index }) => {
    const { setActive, control, setControl, setPodcastPlaying, setPlayPause, playPause, setInd } = useStateContext()
    const [change, setChange] = useState(false)


    const handleClick = (index) => {
        setActive(true)
        setPodcastPlaying(podcast)
        setChange(!change)
        setInd(index)
        setPlayPause(change)
    }




    return (
        <button className="playActions" onClick={() => handleClick(index)} id={"playActions"}>
            {change ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-pause" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                <path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 4v16l13 -8z" />
            </svg>}

        </button>
    )
}

export default PlayPause