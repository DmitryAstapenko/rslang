import React, { FunctionComponent } from "react";

import Card from "@material-ui/core/Card";
import {
  LooksOne,
  LooksTwo,
  Looks3,
  Looks4,
  CheckBox,
  CheckBoxOutlineBlank,
} from "@material-ui/icons";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./GameField.scss";

interface IGameFieldProps {
  currentWord: string;
  levelBonus: number;
  currentTranslate: string;
  onAnswerClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currentChain: number;
}

// eslint-disable-next-line
const GameField: FunctionComponent<IGameFieldProps> = (props: IGameFieldProps) => {
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
      level = <LooksOne />;
      break;
    case 2:
      level = <LooksTwo />;
      break;
    case 3:
      level = <Looks3 />;
      break;
    case 4:
      level = <Looks4 />;
      break;
    default:
      level = <LooksOne />;
      break;
  }

  const emptyCheckBox = (
    <span>
      <CheckBoxOutlineBlank />
    </span>
  );

  const checkBox = (
    <span>
      <CheckBox />
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
    <Card className="game-field">
      <CardContent>
        <div className="game-status">
          {levelBonus === 4 ? checkBox : chain}
          <p>{`+ ${2 ** (levelBonus - 1) * 10} очков за слово`}</p>
        </div>
        <Typography gutterBottom variant="h5" component="h2">
          {level}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {currentWord}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {currentTranslate}
        </Typography>
      </CardContent>
      <CardActions className="game-button-container">
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => onAnswerClick(e)}
        >
          Неверно
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => onAnswerClick(e)}
        >
          Верно
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameField;
