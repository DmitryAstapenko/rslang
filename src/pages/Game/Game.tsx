/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import GameNames from "../../constants/game-names";
import Locations from "../../constants/locations";
import { MAIN } from "../../constants/routes";
import useTypedSelector from "../../hooks/useTypeSelector";
import IUserWordData from "../../types/user-words-types";
import "./Game.scss";
import StartDialog from "../../components/StartDialog";

interface IGameProps {
  game: GameNames;
}

interface ILocationState {
  from: Locations;
}

interface ITemplateGameProps {
  words: IUserWordData[];
}

const TemplateGame: React.FunctionComponent<ITemplateGameProps> = ({
  words,
}: ITemplateGameProps) => {
  console.log(words);
  return <h1>{words.toString()}</h1>;
};

const useBackTo = () => {
  const history = useHistory<ILocationState>();

  const backToPreviousPage = () => history.goBack();
  const backToMain = () => {
    if (!history.location.state?.from) history.push(MAIN);
  };

  return {
    backToPreviousPage,
    backToMain,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useGetWordsForGame = (location: Locations, group?: string) => {
  const { aggregatedWords } = useTypedSelector((state) => state.userWords);

  return { words: aggregatedWords.words };
};

const Game: React.FunctionComponent<IGameProps> = ({ game }: IGameProps) => {
  const { backToPreviousPage, backToMain } = useBackTo();
  backToMain();

  const history = useHistory<ILocationState>();
  const [openStartDialog, setOpenStartDialog] = useState(
    history.location.state?.from === Locations.Menu
  );
  const [selectedGroup, setSelectedGroup] = useState("");
  const { words } = useGetWordsForGame(
    history.location.state?.from,
    selectedGroup
  );

  useEffect(() => {}, []);

  const handleClickCloseButton = () => {
    backToPreviousPage();
  };

  const handleCloseStartDialog = (value: string) => {
    setOpenStartDialog(false);
    setSelectedGroup(value);
  };

  return (
    <div className="game-page">
      <StartDialog
        open={openStartDialog}
        selectGroup={handleCloseStartDialog}
      />
      <Fab
        onClick={handleClickCloseButton}
        size="small"
        color="secondary"
        className="game-page__button-close"
      >
        <CloseIcon />
      </Fab>
      {game === GameNames.Savannah && <TemplateGame words={words} />}
      {game === GameNames.AudioCall && <TemplateGame words={words} />}
      {game === GameNames.Sprint && <TemplateGame words={words} />}
      {game === GameNames.OwnGame && <TemplateGame words={words} />}
    </div>
  );
};

export default Game;
