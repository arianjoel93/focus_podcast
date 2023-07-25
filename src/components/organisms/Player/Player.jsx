import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faVolumeDown, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { useStateContext } from '../../../context/ContextProvider';

const AudioPlayerWrapper = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AudioControls = styled.div`
  display: flex;
  align-items: center;
`;

const PlayPauseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin: 0 10px;
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
`;

const VolumeIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
`;

const VolumeSlider = styled.input`
  -webkit-appearance: none;
  width: 100px;
  height: 4px;
  border-radius: 2px;
  background-color: #ccc;
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #444;
    cursor: pointer;
  }
`;

const AudioTimeSlider = styled.input`
  -webkit-appearance: none;
  width: 100px;
  height: 4px;
  border-radius: 2px;
  background-color: #ccc;
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #444;
    cursor: pointer;
  }
`;

const AudioPlayer = ({ audioUrl, title }) => {
    const { audioState, setAudioPlayingById } = useStateContext();
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = React.createRef();

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
        // Implement your logic to switch to the previous track here
    };

    const handleNextTrack = () => {
        // Implement your logic to switch to the next track here
    };

    return (
        <AudioPlayerWrapper>
            <audio ref={audioRef} src={audioUrl}></audio>
            <h3 style={{ color: 'black' }}>{title}</h3>
            <AudioControls>
                <PlayPauseButton onClick={handlePreviousTrack}>
                    <FontAwesomeIcon icon={faStepBackward} />
                </PlayPauseButton>
                <PlayPauseButton onClick={handlePlayPause}>
                    {audioState[audioUrl]?.isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                </PlayPauseButton>
                <PlayPauseButton onClick={handleNextTrack}>
                    <FontAwesomeIcon icon={faStepForward} />
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
                <VolumeIcon icon={faVolumeDown} />
                <VolumeSlider type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
                <VolumeIcon icon={faVolumeUp} />
            </VolumeControl>
        </AudioPlayerWrapper>
    );
};

export default AudioPlayer;
