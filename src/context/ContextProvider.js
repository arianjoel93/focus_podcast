import React, { createContext, useState, useContext } from "react";

const StateContext = createContext();


export const ContextProvider = ({ children }) => {
  const [active, setActive] = useState(false)
  const [podcastPlaying, setPodcastPlaying] = useState()
  const [ind, setInd] = useState()
  const [control, setControl] = useState(false)
  const [playPause, setPlayPause] = useState(false)
const [backgroundImage, setBackgroundImage] = useState()
  const [pathname, setPathname] = useState('')
  

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
        backgroundImage


      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);