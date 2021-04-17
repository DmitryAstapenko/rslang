import React, { FunctionComponent } from "react";
import {
  LooksOneTwoTone as LooksOne,
  LooksTwoTwoTone as LooksTwo,
  Looks3TwoTone as Looks3,
  Looks4TwoTone as Looks4,
  CheckBoxTwoTone as CheckBox,
  CheckBoxOutlineBlankTwoTone as CheckBoxOutlineBlank,
} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./GameField.scss";
import { Box, Divider, Paper } from "@material-ui/core";

interface IGameFieldProps {
  currentWord: string;
  levelBonus: number;
  currentTranslate: string;
  onAnswerClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currentChain: number;
}

// eslint-disable-next-line
const GameField: FunctionComponent<IGameFieldProps> = (
  props: IGameFieldProps
) => {
  const {
    currentWord,
    levelBonus,
    currentTranslate,
    onAnswerClick,
    currentChain,
  } = props;
  let level;
  let chain;
  switch (levelBonus) {
    case 1:
      level = <LooksOne fontSize="large" />;
      break;
    case 2:
      level = <LooksTwo fontSize="large" />;
      break;
    case 3:
      level = <Looks3 fontSize="large" />;
      break;
    case 4:
      level = <Looks4 fontSize="large" />;
      break;
    default:
      level = <LooksOne fontSize="large" />;
      break;
  }

  const emptyCheckBox = (
    <span>
      <CheckBoxOutlineBlank fontSize="large" />
    </span>
  );

  const checkBox = (
    <span>
      <CheckBox fontSize="large" />
    </span>
  );

  switch (currentChain) {
    case 0:
      chain = (
        <div>
          {emptyCheckBox}
          {emptyCheckBox}
          {emptyCheckBox}
        </div>
      );
      break;
    case 1:
      chain = (
        <div>
          {checkBox}
          {emptyCheckBox}
          {emptyCheckBox}
        </div>
      );
      break;
    case 2:
      chain = (
        <div>
          {checkBox}
          {checkBox}
          {emptyCheckBox}
        </div>
      );
      break;
    case 3:
      chain = (
        <div>
          {checkBox}
          {checkBox}
          {checkBox}
        </div>
      );
      break;

    default:
      break;
  }

  return (
    <Box mt={2}>
      <Paper elevation={3} className="game-field">
        <Box mt={1} mb={1}>
          <div className="game-status">
            {levelBonus === 4 ? checkBox : chain}
            <Typography variant="body2" component="p">{`+ ${
              2 ** (levelBonus - 1) * 10
            } очков за слово`}</Typography>
          </div>
          <Typography variant="h5" component="p">
            {level}
          </Typography>
        </Box>
        <Divider />
        <Box mt={1} mb={1}>
          <Typography variant="h5" component="p">
            {currentWord}
          </Typography>
          <Typography variant="h5" component="p">
            {currentTranslate}
          </Typography>
        </Box>
        <Divider />
        <Box className="game-button-container">
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={(e) => onAnswerClick(e)}
          >
            Неверно
          </Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={(e) => onAnswerClick(e)}
          >
            Верно
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default GameField;
