import React, { useEffect, useState, useMemo } from "react";

import "./time.scss";

interface ITimeProps {
  // eslint-disable-next-line
  finishGame: Function;
}

// eslint-disable-next-line
const Time: React.FunctionComponent<ITimeProps> = (props: ITimeProps) => {
  const { finishGame } = props;
  const numberOfSeconds = useMemo(() => 60, []);
  const [sec, setSec] = useState(numberOfSeconds);
  useEffect(() => {
    const time = setTimeout(() => {
      if (sec === 0) {
        finishGame();
      } else {
        setSec(sec - 1);
      }
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, [sec, finishGame, setSec]);

  return (
    <div className="time-container">
      <h1 className="time-value">{sec}</h1>
    </div>
  );
};

export default Time;
