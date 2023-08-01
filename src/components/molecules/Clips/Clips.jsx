import React, { useEffect, useState } from "react";
import "./Clips.scss"
import PlayPause from "../PlayPause/PlayPause";


const Clips = (
    { cover, podcast, index }
) => {
    const [second, setSecond] = useState()
    const [minutes, setMinutes] = useState(0)
    const [duration, setDuration] = useState(0);

    const audioRef = React.createRef();


    useEffect(() => {
        const audioElement = audioRef.current;
        audioElement.addEventListener('loadedmetadata', () => {
            setDuration(audioElement.duration);
        });
        return () => {
            audioElement.removeEventListener('loadedmetadata', () => {
                setDuration(audioElement.duration);
            });
        };
    }, []);

    useEffect(() => {
        setMinutes(Math.floor(duration / 60))
        setSecond(Math.floor(duration % 60))
    }, [duration])

    return (
        <>
            <audio ref={audioRef} src={podcast}></audio>
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
                    <PlayPause podcast={podcast} index={index} />
                    {minutes == 0 ? <p>{second} seg</p> : <p>{minutes} min</p>}

                </div>
            </div>
        </>
    )
}

export default Clips