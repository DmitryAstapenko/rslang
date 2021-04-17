import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { UnitStatistics as IUnitStatistics } from "../../types/unitStatistics-types";
import "./UnitStatistics.scss";

interface IUnitStatisticsParams {
  group: number;
  unit: IUnitStatistics;
}

const UnitStatistics: React.FunctionComponent<IUnitStatisticsParams> = ({
  group,
  unit,
}: IUnitStatisticsParams) => {
  const { count, correctAnswers: correct, wrongAnswers: wrong } = unit;

  return (
    <Paper className={`unit-statistics group-${group + 1}`}>
      <Typography variant="body1" gutterBottom>
        {`Раздел: ${group + 1}`}
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

export default UnitStatistics;
