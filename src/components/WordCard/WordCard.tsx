/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
  createStyles,
  makeStyles,
  Theme,
  Button,
} from "@material-ui/core";
import "./WordCard.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import React from "react";
import IUserWordData from "../../types/user-words-types";
import useWordCard from "../../hooks/useWordCard";
import {
  NO_STATUS,
  STATUS_DELETED,
  STATUS_HARD,
} from "../../constants/request-params";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "450px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    details: {
      width: "340px",
      display: "flex",
      flexDirection: "column",
      background: "#ececec",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 120,
      height: 120,
      borderRadius: 300,
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

interface IWordsCardProps {
  word: IUserWordData;
  difficultCategory?: boolean;
  learnCategory?: boolean;
  deletedCategory?: boolean;
}

const WordCard: React.FC<IWordsCardProps> = (props: IWordsCardProps) => {
  const classes = useStyles();
  const {
    word,
    difficultCategory: hardCategory,
    learnCategory,
    deletedCategory,
  } = props;
  const { wordAudio, createClickHandler, updateClickHandler } = useWordCard(
    word
  );

  const renderButtons = () => {
    const buttons = (
      <>
        {word.userWord?.status === "hard" ? (
          ""
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => {
              createClickHandler(STATUS_HARD, true);
            }}
          >
            Сложное
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          size="small"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={() => {
            createClickHandler(STATUS_DELETED, false);
          }}
        >
          Удалить
        </Button>
      </>
    );
    switch (true) {
      case deletedCategory === false &&
        learnCategory === false &&
        hardCategory === false:
        return buttons;
      case deletedCategory === true:
        return (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            className={classes.button}
            startIcon={<PresentToAllIcon />}
            onClick={() => {
              updateClickHandler(NO_STATUS, false);
            }}
          >
            восстановить
          </Button>
        );
      case hardCategory === true:
        return (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            className={classes.button}
            startIcon={<PresentToAllIcon />}
            onClick={() => {
              updateClickHandler(NO_STATUS, true);
            }}
          >
            восстановить
          </Button>
        );
      default:
        return <></>;
    }
  };

  return (
    <Card
      className={`word-card group-${word.group + 1}${
        word.userWord?.status ? " hard" : ""
      }`}
    >
      <CardMedia
        className={classes.cover}
        image={`https://rnovikov-rs-lang-back.herokuapp.com/${word.image}`}
        title={word.word}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {word.word} {word.transcription}
          </Typography>
          <Typography component="h6" variant="h6">
            {word.wordTranslate}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            dangerouslySetInnerHTML={{
              __html: `${word.textMeaning}(${word.textMeaningTranslate})`,
            }}
          />
          <Typography
            variant="subtitle1"
            color="textSecondary"
            dangerouslySetInnerHTML={{
              __html: `${word.textExample}(${word.textExampleTranslate})`,
            }}
          />
        </CardContent>
        <div className={classes.controls}>
          <IconButton
            aria-label="play/pause"
            onClick={() => {
              wordAudio.play();
            }}
          >
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          {renderButtons()}
        </div>
      </div>
    </Card>
  );
};

WordCard.defaultProps = {
  difficultCategory: false,
  learnCategory: false,
  deletedCategory: false,
};

export default WordCard;
