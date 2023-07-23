import "./Player.scss"
import { Slider } from 'primereact/slider';
import { Howl, Howler } from 'howler';
import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../../context/ContextProvider";

const Player = () => {

    const { podcastPlaying, control, setPlayPause, setControl, ind } = useStateContext()
    const soundRef = useRef(null);
    const [durationTime, setDurationTime] = useState(0)
    const [second, setSecond] = useState()
    const [minutes, setMinutes] = useState(0)
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const interval = useRef(null);
    const [player, setPlayer] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(1)

    useEffect(() => {
        if (podcastPlaying) {
            setPlayer("")
            const sound = new Howl({
                src: [podcastPlaying],
                html5: true,
                onplay: () => { setIsPlaying(true) },
                onpause: () => setIsPlaying(false),
                onend: () => { setIsPlaying(false); setProgress(0); setTime({ hours: 0, minutes: 0, seconds: 0 }) },
                onloaderror: (id, error) => console.error('Error al cargar el audio:', error),
                onplayerror: (id, error) => console.error('Error al reproducir el audio:', error),
                onload: () => {
                    sound.play()
                    setProgress(0)
                    var duration = sound.duration()
                    setDurationTime(duration)
                    setMinutes(Math.floor(duration / 60))
                    setSecond(Math.floor(duration % 60))
                }
            });
            setPlayer(sound);
            sound.volume(volume)
            soundRef.current = sound;

            return () => {
                sound.unload();
            };
        }

    }, [podcastPlaying]);


    useEffect(() => {
        let _val = progress;
        if (isPlaying) {
            interval.current = setInterval(() => {
                _val += 100 / durationTime
                if (_val >= 100 - (100 / durationTime)) {
                    _val = 100;
                }
                setProgress(_val)

            }, 1000)


            return () => {
                if (interval.current) {
                    clearInterval(interval.current);
                    interval.current = null;
                }
            };
        }
    }, [isPlaying, progress])

    useEffect(() => {
        if (podcastPlaying) {
            const sound = soundRef.current;
            sound.seek(durationTime * progress / 100)
            let seconds = Math.floor(sound.seek())
            if (seconds > 59) {
                seconds = Math.floor(sound.seek() % 60)
            } else {
                seconds = Math.floor(sound.seek())
            }
            let minutes = Math.floor(sound.seek() / 60)
            let hours = Math.floor(minutes / 60)
            let variant = { hours: hours, minutes: minutes, seconds: seconds }
            setTime(variant)
        }
    }, [progress])

    const togglePlay = () => {

        if (player) {
            if (isPlaying) {
                player.pause();
                setPlayPause(true)
            } else {
                player.play();
                setPlayPause(false)

            }
        }
    };


    const handleVolumeChange = (event) => {
        let newVolume = parseFloat(event.value);
        setVolume(newVolume);
        player.volume(newVolume); // Actualizamos el volumen del audio en Howler.js
    };

    return (

        <aside className="menuPlayer">
            <div className="progress">
                <Slider className="Container" value={progress} onChange={(e) => setProgress(e.value)} />
            </div>
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
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-skip-back" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M20 5v14l-12 -7z" />
                            <path d="M4 5l0 14" />
                        </svg>
                    </button>
                    <button className="action play" onClick={togglePlay}>
                        {
                            isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-pause" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                                <path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                            </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M7 4v16l13 -8z" />
                                </svg>
                        }
                    </button>
                    <button className="action next">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-skip-back" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M20 5v14l-12 -7z" />
                            <path d="M4 5l0 14" />
                        </svg>
                    </button>
                </div>
                <div className="volume">
                    {volume > 0.5 ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-volume" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 8a5 5 0 0 1 0 8" />
                        <path d="M17.7 5a9 9 0 0 1 0 14" />
                        <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
                    </svg> : volume <= 0.5 && volume > 0 ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-volume-2" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 8a5 5 0 0 1 0 8" />
                        <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-volume-3" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
                        <path d="M16 10l4 4m0 -4l-4 4" />
                    </svg>}
                    <Slider min={0} step={0.01} max={1} value={volume} onChange={handleVolumeChange} />
                    
                </div>
            </div>
        </aside>
    )
}

export default Player