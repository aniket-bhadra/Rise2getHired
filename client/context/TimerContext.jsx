import { createContext, useState } from "react";

export const TimerContext = createContext({
  duration: 10,
  setDuration: () => {},
});

const TimerProvider = ({ children }) => {
  const [duration, setDuration] = useState(10);
  const [user, setUser] = useState();

  return (
    <TimerContext.Provider value={{ duration, setDuration, user, setUser }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
