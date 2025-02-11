import { createContext, useState } from "react";

export const TimerContext = createContext({
  duration: 10,
  setDuration: () => {},
});

const TimerProvider = ({ children }) => {
  const [duration, setDuration] = useState(10);
  // const [count, setCount] = useState(5);
  return (
    <TimerContext.Provider value={{ duration, setDuration }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
