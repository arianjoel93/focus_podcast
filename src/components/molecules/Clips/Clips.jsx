import { useEffect, useState } from "react";
import "./Clips.scss"
import { Howl } from 'howler';
import { useStateContext } from "../../../context/ContextProvider";
import PlayPause from "../../PlayPause/PlayPause";


const Clips = (
    { cover, podcast, index }
) => {
    const { setActive, control, setControl, setPodcastPlaying, active } = useStateContext()
    const [second, setSecond] = useState()
    const [minutes, setMinutes] = useState(0)


    useEffect(() => {
        const sound = new Howl({
            src: [podcast],
            html5: true,
            onload: () => {
                var duration = sound.duration()
                setMinutes(Math.floor(duration / 60))
                setSecond(Math.floor(duration % 60))
            }
        });


    }, []);

    const handleClick = () => {
        setActive(true)
        setPodcastPlaying(podcast)
        setControl(!control)
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
                    <PlayPause podcast={podcast} index={index}/>
                    {minutes == 0 ? <p>{second} seg</p> : <p>{minutes} min</p>}
                </div>
            </div>
        </>
    )
}

export default Clips