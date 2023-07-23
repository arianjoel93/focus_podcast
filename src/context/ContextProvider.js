import React, { createContext, useState, useContext, useEffect, useRef } from "react";

const StateContext = createContext();


export const ContextProvider = ({ children }) => {
  const [active, setActive] = useState(false)
  const [podcastPlaying, setPodcastPlaying] = useState()
  const [ind, setInd] = useState()
  const [control, setControl] = useState(false)



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
        control


      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);