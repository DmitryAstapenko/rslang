/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from "moment";
import { useEffect } from "react";
import {
  AllTimeStatistic,
  GamesNames,
  IDayStatistics,
} from "../types/statistics-types";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";

const useLearningStatistics = () => {
  const { token, userId } = useTypedSelector((state) => state.auth);
  const { getStatistics } = useActions();

  useEffect(() => {
    getStatistics(userId, token);
  }, []);

  const gamePercentage = (
    stat: IDayStatistics | AllTimeStatistic,
    gameName: GamesNames
  ) => {
    const percent =
      (stat[gameName].correct /
        (stat[gameName].correct + stat[gameName].wrong)) *
      100;
    if (Number.isNaN(percent)) {
      return 0;
    }
    return percent.toFixed(2);
  };

  const dayPercentage = (today: IDayStatistics) => {
    const { correctAnswers, wrongAnswers } = today;

    const percent = (correctAnswers / (correctAnswers + wrongAnswers)) * 100;

    if (Number.isNaN(percent)) {
      return 0;
    }
    return percent.toFixed(2);
  };
  const formatXAxis = (tickItem: any) => {
    return moment(tickItem).format("YYYY-MM-DD");
  };

  const formatLabel = (label: any) => {
    return moment(label).format("YYYY-MM-DD");
  };

  return { gamePercentage, dayPercentage, formatXAxis, formatLabel };
};

export default useLearningStatistics;
