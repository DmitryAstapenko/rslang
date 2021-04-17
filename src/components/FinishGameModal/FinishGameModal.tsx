/* eslint-disable react/no-array-index-key */
import React, { FC, useEffect } from "react";
import { Backdrop, Box, Divider, Paper, Typography } from "@material-ui/core";
import ModalCard from "./ModalCard";
import IUserWordData from "../../types/user-words-types";
import useUpdateStatistic from "../../hooks/useUpdateStatistic";
import { GamesNames } from "../../types/statistics-types";
import useTypedSelector from "../../hooks/useTypeSelector";
import useActions from "../../hooks/useActions";
import "./FinishGameModal.scss";

interface IFinishGameModalProps {
  gameName: GamesNames;
  longestSeries: number;
  correctWords: IUserWordData[];
  mistakes: IUserWordData[];
  gamingScore: number;
}

const FinishGameModal: FC<IFinishGameModalProps> = ({
  gameName,
  longestSeries,
  correctWords,
  mistakes,
  gamingScore,
}: IFinishGameModalProps) => {
  const totalWordCount = correctWords.length + mistakes.length;
  const correctAnswersPercent = Math.round(
    (100 * correctWords.length) / totalWordCount
  );
  const { updateGameStatistics } = useUpdateStatistic();
  const { isAuthenticated, userId, token } = useTypedSelector(
    (state) => state.auth
  );
  const { updateScore } = useActions();
  // console.log(score);

  useEffect(() => {
    if (isAuthenticated) {
      updateGameStatistics(gameName, {
        streak: longestSeries,
        wrong: mistakes.length,
        correct: correctWords.length,
      });
      updateScore(userId, token, gamingScore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <Backdrop open>
      <Paper className="game-modal">
        <Typography variant="body1">{`Общее колличество слов: ${totalWordCount}`}</Typography>
        <Divider />
        <Typography variant="body1">{`Правильные ответы: ${
          Number.isNaN(correctAnswersPercent) ? 0 : correctAnswersPercent
        } %`}</Typography>
        <Divider />
        <Typography variant="body1">{`Самая длинная серия: ${longestSeries}`}</Typography>
        <Divider />
        <Box mt={2} className="game-modal__result">
          <Box>
            <Typography
              variant="h6"
              className="game-modal__result_title correct"
            >
              <span>Верно</span>
              <span>{correctWords.length}</span>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" className="game-modal__result_title wrong">
              <span>Не верно</span>
              <span>{mistakes.length}</span>
            </Typography>
          </Box>
          <Box className="game-modal__result_words">
            {correctWords.map((word, i) => (
              <ModalCard key={i} correct word={word} />
            ))}
          </Box>
          <Box className="game-modal__result_words">
            {mistakes.map((word, i) => (
              <ModalCard key={i} correct={false} word={word} />
            ))}
          </Box>
        </Box>
      </Paper>
    </Backdrop>
  );
};

export default FinishGameModal;
