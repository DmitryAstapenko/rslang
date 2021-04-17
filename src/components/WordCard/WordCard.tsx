/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Typography,
  IconButton,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import "./WordCard.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import {
  AddTwoTone,
  AllInclusiveTwoTone,
  RemoveTwoTone,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import IUserWordData from "../../types/user-words-types";
import useWordCard from "../../hooks/useWordCard";
import useTypedSelector from "../../hooks/useTypeSelector";

const useWordStatistics = (word: IUserWordData) => {
  const { correctAnswers: correct, wrongAnswers: wrong } = word?.userWord
    ?.optional
    ? word.userWord.optional
    : { wrongAnswers: 0, correctAnswers: 0 };

  return { all: correct + wrong, correct, wrong };
};

interface IWordsCardProps {
  word: IUserWordData;
  difficultCategory?: boolean;
  learnCategory?: boolean;
  deletedCategory?: boolean;
}

const WordCard: React.FC<IWordsCardProps> = (props: IWordsCardProps) => {
  const { word, difficultCategory, learnCategory, deletedCategory } = props;
  const { all, correct, wrong } = useWordStatistics(word);
  const { isAuthenticated } = useTypedSelector((state) => state.auth);
  const { bookSettings } = useTypedSelector((state) => state.settings);
  const { isFetching, error } = useTypedSelector((state) => state.statistics);
  const { isUpdating, error: wordError } = useTypedSelector(
    (state) => state.userWords
  );

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (isFetching || error || isUpdating || wordError) setDisable(true);
    else setDisable(false);
  }, [isFetching, error, isUpdating, wordError]);

  const {
    playSound,
    handelMuteButtonClick,
    changeHardStatusHandler,
    changeDeletedStatusHandler,
    changeNoStatusHandler,
  } = useWordCard(word);

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
            startIcon={<AddCircleOutlineIcon />}
            onClick={changeHardStatusHandler}
            disabled={disable}
          >
            Сложное
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={changeDeletedStatusHandler}
          disabled={disable}
        >
          Удалить
        </Button>
      </>
    );
    switch (true) {
      case deletedCategory === false &&
        learnCategory === false &&
        difficultCategory === false:
        return buttons;
      case deletedCategory === true:
        return (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<PresentToAllIcon />}
            onClick={changeNoStatusHandler}
            disabled={disable}
          >
            восстановить
          </Button>
        );
      case difficultCategory === true:
        return (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<PresentToAllIcon />}
            onClick={changeNoStatusHandler}
            disabled={disable}
          >
            восстановить
          </Button>
        );
      default:
        return buttons;
    }
  };

  return (
    <Paper
      className={`word-card group-${word.group + 1} ${word.userWord?.status}`}
    >
      <div
        className="word-card__media"
        style={{
          backgroundImage: `url(https://rnovikov-rs-lang-back.herokuapp.com/${word.image})`,
        }}
      />
      <div className="word-card__content">
        <Typography component="h6" variant="h6">
          {word.word} {word.transcription}
        </Typography>
        {bookSettings.isWordTranslate ? (
          <>
            <Typography component="h6" variant="h6">
              {word.wordTranslate}
            </Typography>
          </>
        ) : (
          ""
        )}
        <Typography
          variant="subtitle1"
          color="textSecondary"
          dangerouslySetInnerHTML={{
            __html: `${word.textMeaning}${
              bookSettings.isSentenceTranslate
                ? `(${word.textMeaningTranslate})`
                : ""
            }`,
          }}
        />
        <Typography
          variant="subtitle1"
          color="textSecondary"
          dangerouslySetInnerHTML={{
            __html: `${word.textExample}${
              bookSettings.isSentenceTranslate
                ? `(${word.textExampleTranslate})`
                : ""
            }`,
          }}
        />
        <div className="word-card__content_buttons">
          <IconButton aria-label="play/pause" onClick={handelMuteButtonClick}>
            <>{playSound ? <StopIcon /> : <PlayArrowIcon />}</>
          </IconButton>
          {bookSettings.isButtons ? (
            <>{isAuthenticated ? <>{renderButtons()}</> : ""}</>
          ) : (
            <></>
          )}
        </div>
      </div>
      {isAuthenticated && (
        <div className="word-card__statistics">
          <List>
            <ListItem>
              <ListItemIcon>
                <AllInclusiveTwoTone />
              </ListItemIcon>
              <ListItemText primary={all} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AddTwoTone />
              </ListItemIcon>
              <ListItemText primary={correct} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <RemoveTwoTone />
              </ListItemIcon>
              <ListItemText primary={wrong} />
            </ListItem>
          </List>
        </div>
      )}
    </Paper>
  );
};

WordCard.defaultProps = {
  difficultCategory: false,
  learnCategory: false,
  deletedCategory: false,
};

export default WordCard;
