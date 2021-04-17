import { Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";

interface ITimeProps {
  finishGame: () => void;
}

const Time: React.FunctionComponent<ITimeProps> = (props: ITimeProps) => {
  const { finishGame } = props;
  const [sec, setSec] = useState(60);

  useEffect(() => {
    const time = setTimeout(() => {
      if (sec === 0) {
        finishGame();
      } else {
        setSec((s) => s - 1);
      }
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, [sec, finishGame]);

  return (
    <Typography variant="h5" className="time-container">
      {sec}
    </Typography>
  );
};

export default Time;
