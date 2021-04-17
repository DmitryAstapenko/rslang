import { Paper, Typography } from "@material-ui/core";
import * as React from "react";
import IUserWordData from "../../types/user-words-types";
import "./PageStatistics.scss";

const useGetPageStatistics = (words: IUserWordData[]) => {
  const count = words.length;
  const correct = words.reduce((accumulator, current) => {
    const result = current?.userWord?.optional
      ? current.userWord.optional.correctAnswers + accumulator
      : 0 + accumulator;
    return result;
  }, 0);
  const wrong = words.reduce((accumulator, current) => {
    const result = current?.userWord?.optional
      ? current.userWord.optional.wrongAnswers + accumulator
      : 0 + accumulator;
    return result;
  }, 0);

  return { count, correct, wrong };
};

interface IPageStatisticsProps {
  group: number;
  page: number;
  words: IUserWordData[];
}

const PageStatistics: React.FunctionComponent<IPageStatisticsProps> = ({
  group,
  page,
  words,
}: IPageStatisticsProps) => {
  const { count, correct, wrong } = useGetPageStatistics(words);

  return (
    <Paper className={`page-statistics group-${group + 1}`}>
      <Typography variant="body1" gutterBottom>
        {`Страница: ${page + 1}`}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {`Кол-во: ${count}`}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {`Верно: ${correct}`}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {`Не верно: ${wrong}`}
      </Typography>
    </Paper>
  );
};

export default PageStatistics;
