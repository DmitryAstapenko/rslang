import React, { FC, useMemo } from "react";
import { Box, LinearProgress } from "@material-ui/core";
import useTypedSelector from "../../hooks/useTypeSelector";
import "react-sweet-progress/lib/style.css";
import "./Score.scss";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Progress } = require("react-sweet-progress");

const Score: FC = () => {
  const { score } = useTypedSelector((state) => state.score);
  const { loading, isAuthenticated } = useTypedSelector((state) => state.auth);
  const scorePerLevel = useMemo(() => 500, []);
  const scoreData = {
    levelPercent: ((score % scorePerLevel) * 100) / scorePerLevel,
    level: Math.floor(score / scorePerLevel),
  };

  return isAuthenticated ? (
    <div className="level">
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
          <div className="level__label">
            {`Level `}
            <Box borderRadius="50%" className="level__number">
              {scoreData.level}
            </Box>
          </div>
          <Progress
            percent={scoreData.levelPercent}
            symbolClassName="level__label__symbol"
          />
        </>
      )}
    </div>
  ) : null;
};

export default Score;
