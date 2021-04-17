import { Typography } from "@material-ui/core";
import React from "react";

interface IScoreProps {
  score: number;
}

const Score: React.FunctionComponent<IScoreProps> = (props: IScoreProps) => {
  const { score } = props;
  return (
    <Typography variant="h5" className="game-sprint-score">
      {`Счёт: ${score}`}
    </Typography>
  );
};

export default Score;
