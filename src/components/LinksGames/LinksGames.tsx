import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "@material-ui/core";
import { GamesTwoTone } from "@material-ui/icons";
import { nanoid } from "nanoid";
import Locations from "../../constants/locations";
import { OWN_GAME, SAVANNAH, AUDIO_CALL, SPRINT } from "../../constants/routes";
import "./LinksGames.scss";

const linksData = [
  { name: "Саванна", route: SAVANNAH },
  { name: "Аудио вызов", route: AUDIO_CALL },
  { name: "Спринт", route: SPRINT },
  { name: "Угадай слово", route: OWN_GAME },
];

interface ILinksGamesProps {
  group: number;
  page: number;
  filter: string;
  wordsPerPage: number;
  count: number;
}

const LinksGames: React.FunctionComponent<ILinksGamesProps> = ({
  group,
  page,
  filter,
  wordsPerPage,
  count,
}: ILinksGamesProps) => {
  return (
    <div className="links-game">
      {linksData.map((item) => {
        return (
          <LinkContainer
            key={nanoid()}
            to={{
              pathname: item.route,
              state: {
                from: Locations.Book,
                group,
                page,
                filter,
                wordsPerPage,
                count,
              },
            }}
          >
            <Button
              variant="contained"
              color="default"
              startIcon={<GamesTwoTone />}
            >
              {item.name}
            </Button>
          </LinkContainer>
        );
      })}
    </div>
  );
};

export default LinksGames;
