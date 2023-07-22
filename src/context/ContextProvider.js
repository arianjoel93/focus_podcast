import React, { createContext, useState, useContext, useEffect, useRef } from "react";
//audio
import podcast from "../assets/mp3/podcast.mp3"
import podcast1 from "../assets/mp3/podcast1.mp3"

const StateContext = createContext();


export const ContextProvider = ({ children }) => {
  const [active, setActive] = useState(false)
  const [podcastPlaying, setPodcastPlaying] = useState()
  const soundRef = useRef(null);
  const [durationTime, setDurationTime] = useState(0)
  const [second, setSecond] = useState()
  const [minutes, setMinutes] = useState(0)
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const interval = useRef(null);
  const [player, setPlayer] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)
  const [ind, setInd] = useState()
  const ArrayPodcasts = [
    podcast,
    podcast1
  ]


  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        setActive,
        active,
        setInd,
        ind,
        podcastPlaying,
        setPodcastPlaying

      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
