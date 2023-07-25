import React, { createContext, useState, useContext } from "react";

const StateContext = createContext();


export const ContextProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [active, setActive] = useState(false)
  const [podcastPlaying, setPodcastPlaying] = useState()
  const [ind, setInd] = useState()
  const [control, setControl] = useState(false)
  const [playPause, setPlayPause] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState()
  const [pathname, setPathname] = useState('')
  const [audioState, setAudioState] = useState({});

  const setAudioPlayingById = (audioUrl, isPlaying) => {
    setAudioState((prevState) => ({
      ...prevState,
      [audioUrl]: { ...prevState[audioUrl], isPlaying },
    }));
  };
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        setActive,
        active,
        setInd,
        ind,
        podcastPlaying,
        setPodcastPlaying,
        setControl,
        control,
        setPlayPause,
        playPause,
        pathname,
        setPathname,
        setBackgroundImage,
        backgroundImage,
        setIsPlaying,
        isPlaying,
        audioState,
        setAudioPlayingById


      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);