/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Box,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from "@material-ui/core";
import { LabelImportantTwoTone } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import moment from "moment";
import { nanoid } from "nanoid";
import React from "react";
import {
  BarChart,
  Bar,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import useLearningStatistics from "../../hooks/useLearningStatistics";
import useTypedSelector from "../../hooks/useTypeSelector";
import { AllTimeStatistic, GamesNames } from "../../types/statistics-types";
import "./LearningStatistics.scss";

const LearningStatistics: React.FunctionComponent = () => {
  const {
    dayPercentage,
    gamePercentage,
    formatXAxis,
    formatLabel,
  } = useLearningStatistics();

  const { statistics, isFetching } = useTypedSelector(
    (state) => state.statistics
  );

  const dayStatisticsData = [
    {
      text: "Общее количество изучаемых слов: ",
      value: statistics.learnedWords,
    },
    {
      text: "Сегодня изучалось слов: ",
      value: statistics.optional.today.dayLearns,
    },
    {
      text: "Сегодня изучено слов: ",
      value: statistics.optional.today.learnedWordsToday,
    },
    {
      text: "Процент правильных ответов за день: ",
      value: dayPercentage(statistics.optional.today),
    },
    {
      text: "Саванна: серия правильных ответов: ",
      value: statistics.optional.today.savanna.streak,
    },
    {
      text: "Саванна: процент правильных ответов: ",
      value: gamePercentage(statistics.optional.today, GamesNames.Savanna),
    },
    {
      text: "Спринт: серия правильных ответов: ",
      value: statistics.optional.today.sprint.streak,
    },
    {
      text: "Спринт: процент правильных ответов: ",
      value: gamePercentage(statistics.optional.today, GamesNames.Sprint),
    },
    {
      text: "Аудиовызов: серия правильных ответов: ",
      value: statistics.optional.today.audioCall.streak,
    },
    {
      text: "Аудиовызов: процент правильных ответов: ",
      value: gamePercentage(statistics.optional.today, GamesNames.AudioCall),
    },
    {
      text: "Угадай слово: серия правильных ответов: ",
      value: statistics.optional.today.knowWords.streak,
    },
    {
      text: "Угадай слово: процент правильных ответов: ",
      value: gamePercentage(statistics.optional.today, GamesNames.KnowWords),
    },
  ];

  const getDayStatisticsData = (
    stat: AllTimeStatistic
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): { text: string; value: any }[] => {
    return [
      {
        text: "В этот день изучалось слов: ",
        value: stat.dayLearns,
      },
      {
        text: "В этот день изучено слов: ",
        value: stat.learnedWordsToday,
      },
      {
        text: "Процент правильных ответов за день: ",
        value: dayPercentage(stat),
      },
      {
        text: "Саванна: серия правильных ответов: ",
        value: stat.savanna.streak,
      },
      {
        text: "Саванна: процент правильных ответов: ",
        value: gamePercentage(stat, GamesNames.Savanna),
      },
      {
        text: "Спринт: серия правильных ответов: ",
        value: stat.sprint.streak,
      },
      {
        text: "Спринт: процент правильных ответов: ",
        value: gamePercentage(stat, GamesNames.Sprint),
      },
      {
        text: "Аудиовызов: серия правильных ответов: ",
        value: stat.audioCall.streak,
      },
      {
        text: "Аудиовызов: процент правильных ответов: ",
        value: gamePercentage(stat, GamesNames.AudioCall),
      },
      {
        text: "Угадай слово: серия правильных ответов: ",
        value: stat.knowWords.streak,
      },
      {
        text: "Угадай слово: процент правильных ответов: ",
        value: gamePercentage(stat, GamesNames.KnowWords),
      },
    ];
  };

  return (
    <>
      {isFetching ? (
        <Box mt={2}>
          <LinearProgress />
        </Box>
      ) : (
        <>
          <Box className="wrapper-statistics" mt={2}>
            <Paper className="learning-statistics">
              <Box m={1}>
                <Typography variant="h6" component="h3">
                  Статистика за сегодня
                </Typography>
              </Box>
              <Divider />
              <List>
                {dayStatisticsData.map((stat) => {
                  return (
                    <ListItem
                      key={nanoid()}
                      className="learning-statistics__day-statistics-item"
                    >
                      <ListItemIcon>
                        <LabelImportantTwoTone />
                      </ListItemIcon>
                      <ListItemText primary={stat.text} />
                      <Divider orientation="vertical" />
                      <ListItemText primary={stat.value} />
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
            {statistics.optional.allTime.length ? (
              <Paper className="learning-statistics">
                <Box m={1}>
                  <Typography variant="h6" component="h3">
                    Подробная статистика за все дни обучения
                  </Typography>
                </Box>
                <Divider />
                <List
                  className="learning-statistics__on-day"
                  subheader={<li />}
                >
                  {statistics.optional.allTime.map((s) => (
                    <li
                      key={nanoid()}
                      className="learning-statistics__on-day_list-section"
                    >
                      <ul>
                        <ListSubheader>
                          {moment(s.date).format("YYYY-MM-DD")}
                        </ListSubheader>
                        {getDayStatisticsData(s).map((item) => (
                          <ListItem
                            key={nanoid()}
                            className="learning-statistics__day-statistics-item"
                          >
                            <ListItemIcon>
                              <LabelImportantTwoTone />
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                            <Divider orientation="vertical" />
                            <ListItemText primary={item.value} />
                          </ListItem>
                        ))}
                      </ul>
                    </li>
                  ))}
                </List>
              </Paper>
            ) : (
              <Box mt={2}>
                <Alert severity="warning">
                  Данные за период обучения на данный момент отсутствуют!
                </Alert>
              </Box>
            )}
          </Box>

          {statistics.optional.allTime.length ? (
            <>
              <Box mt={2}>
                <Paper>
                  <Box p={1}>
                    <Box p={1}>
                      <Typography variant="h6" component="h3">
                        Количество изученных слов за каждый день изучения
                      </Typography>
                    </Box>
                    <Divider />
                    <Box className="learning-statistics__chart">
                      <ResponsiveContainer>
                        <BarChart data={statistics.optional.allTime}>
                          <XAxis
                            dataKey="date"
                            name="Дата"
                            tickFormatter={formatXAxis}
                          />
                          <YAxis />
                          <Tooltip labelFormatter={formatLabel} />
                          <Legend />
                          <Bar
                            dataKey="dayLearns"
                            name="Изучено слов"
                            fill="#8884d8"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Box>
                </Paper>
              </Box>
              <Box mt={2}>
                <Paper>
                  <Box p={1}>
                    <Box p={1}>
                      <Typography variant="h6" component="h3">
                        Увеличение общего количества изученных слов за весь
                        период изучения по дням
                      </Typography>
                    </Box>
                    <Divider />
                    <Box className="learning-statistics__chart">
                      <ResponsiveContainer>
                        <AreaChart
                          data={statistics.optional.allTime}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            name="Дата"
                            tickFormatter={formatXAxis}
                          />
                          <YAxis />
                          <Tooltip labelFormatter={formatLabel} />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="learnedWords"
                            name="Изучаемые слова"
                            fill="#8884d8"
                            stroke="#8884d8"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Box>
                  </Box>
                </Paper>
              </Box>

              <Box mt={2} />
            </>
          ) : (
            <Box mt={2}>
              <Alert severity="warning">
                Данные за период обучения на данный момент отсутствуют!
              </Alert>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default LearningStatistics;
