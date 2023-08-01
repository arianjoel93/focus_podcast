import "./Player.scss"

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faVolumeDown, faVolumeMute, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';
import { useStateContext } from '../../../context/ContextProvider';

const AudioPlayerWrapper = styled.div`
background: linear-gradient(to top, #242424, #484747);
padding: 10px 100px;
border-radius: 0px;
display: flex;
align-items: center;
justify-content: space-between;
position: fixed;
bottom: 0;
left: 0;
width: 100%;
height: 80px;
    z-index: 999;
`;

const AudioControls = styled.div`
  display: flex;
  align-items: center;
`;

const PlayPauseButton = styled.button`
background-color: #ffffffbd;
border: none;
font-size: 24px;
cursor: pointer;
margin: 0 10px;
width: 50px;
height: 50px;
border-radius: 50%;
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
`;

const VolumeIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  width:30px;
`;

const VolumeSlider = styled.input`
  -webkit-appearance: none;
  width: 100px;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(45deg, #67acc9, #1b5167);
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #ccc;
    cursor: pointer;
  }
`;

const AudioTimeSlider = styled.input`
-webkit-appearance: none;
/* width: 100px; */
height: 4px;
border-radius: 2px;
background: linear-gradient(45deg, #67acc9, #1b5167);
// outline: none;
position: absolute;
width: 100%;
top: -2px;
left: 0;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    // appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #ccc;
    cursor: pointer;
  }
`;

const AudioPlayer = ({ audioUrl, title }) => {
    const { audioState, setAudioPlayingById, setTime } = useStateContext();
    const [volSave, setVolSave] = useState(0)
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = React.createRef();
    const screen = window.screen.width;

    useEffect(() => {
        if (audioState[audioUrl]?.isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [audioState, audioUrl]);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        const audioElement = audioRef.current;
        audioElement.addEventListener('timeupdate', () => {
            setCurrentTime(audioElement.currentTime);
        });
        audioElement.addEventListener('loadedmetadata', () => {
            setDuration(audioElement.duration);
        });
        return () => {
            audioElement.removeEventListener('timeupdate', () => {
                setCurrentTime(audioElement.currentTime);
            });
            audioElement.removeEventListener('loadedmetadata', () => {
                setDuration(audioElement.duration);
            });
        };
    }, []);



    const handlePlayPause = () => {
        const currentAudioState = audioState[audioUrl]?.isPlaying;
        // Pausar el audio actualmente en reproducción (si lo hay)
        Object.keys(audioState).forEach((url) => {
            if (url !== audioUrl && audioState[url]?.isPlaying) {
                setAudioPlayingById(url, false);
            }
        });

        // Iniciar o pausar el audio actual
        setAudioPlayingById(audioUrl, !currentAudioState);
    };

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    const handleTimeChange = (event) => {
        audioRef.current.currentTime = event.target.value;
    };

    const handlePreviousTrack = () => {
        audioRef.current.currentTime = currentTime - 15
    };

    const handleNextTrack = () => {
        audioRef.current.currentTime = currentTime + 15
    };

    const handleVolume = async () => {
        await setVolSave(volume);
        if (volume !== 0) {
            setVolume(0)
        } else {
            setVolume(volSave)
        }
    }

    useEffect(() => {
        if (currentTime / duration !== NaN)
            setTime(100 * currentTime / duration)
    }, [currentTime])

    return (
        <>
            {screen > 820 ? (
                <AudioPlayerWrapper>
                    <audio ref={audioRef} src={audioUrl}></audio>
                    <h3 style={{ color: '#ccc' }}>{title}</h3>
                    <AudioControls>
                        <PlayPauseButton onClick={handlePreviousTrack}>
                            <FontAwesomeIcon icon={faUndo} />
                        </PlayPauseButton>
                        <PlayPauseButton onClick={handlePlayPause}>
                            {audioState[audioUrl]?.isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                        </PlayPauseButton>
                        <PlayPauseButton onClick={handleNextTrack}>
                            <FontAwesomeIcon icon={faRedo} />
                        </PlayPauseButton>
                        <AudioTimeSlider
                            type="range"
                            min={0}
                            max={duration}
                            value={currentTime}
                            onChange={handleTimeChange}
                        />
                    </AudioControls>
                    <VolumeControl>
                        <VolumeIcon icon={volume == 0 ? faVolumeMute : volume < 0.5 ? faVolumeDown : faVolumeUp} onClick={() => handleVolume()} />
                        <VolumeSlider type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
                    </VolumeControl>
                </AudioPlayerWrapper>
            ) : (
                <AudioPlayerWrapper>
                    <audio ref={audioRef} src={audioUrl}></audio>
                    <h3 style={{ color: '#ccc' }}>{title}</h3>
                    <AudioControls>
                        <PlayPauseButton onClick={handlePlayPause}>
                            {audioState[audioUrl]?.isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                        </PlayPauseButton>
                        <AudioTimeSlider
                            type="range"
                            min={0}
                            max={duration}
                            value={currentTime}
                            onChange={handleTimeChange}
                        />
                    </AudioControls>
                </AudioPlayerWrapper>
            )}
        </>
    );
};

export default AudioPlayer;
