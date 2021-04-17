import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Drawer from "@material-ui/core/Drawer";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import { nanoid } from "nanoid";
import {
  ExpandLess,
  ExpandMore,
  GamesTwoTone,
  VideogameAssetTwoTone,
  CollectionsBookmarkTwoTone,
  LibraryBooksTwoTone,
  BookmarkTwoTone,
  EqualizerTwoTone,
} from "@material-ui/icons";
import {
  BOOK,
  STUDIED_WORDS,
  DIFFICULT_WORDS,
  DELETED_WORDS,
  SAVANNAH,
  AUDIO_CALL,
  SPRINT,
  OWN_GAME,
  STATISTICS,
} from "../../constants/routes";
import Locations from "../../constants/locations";
import useTypedSelector from "../../hooks/useTypeSelector";

const groupsData = [
  { text: "Раздел 1", link: `${BOOK}/0/0` },
  { text: "Раздел 2", link: `${BOOK}/1/0` },
  { text: "Раздел 3", link: `${BOOK}/2/0` },
  { text: "Раздел 4", link: `${BOOK}/3/0` },
  { text: "Раздел 5", link: `${BOOK}/4/0` },
  { text: "Раздел 6", link: `${BOOK}/5/0` },
];

const gamesData = [
  {
    text: "Саванна",
    link: { pathname: SAVANNAH, state: { from: Locations.Menu } },
  },
  {
    text: "Аудио вызов",
    link: { pathname: AUDIO_CALL, state: { from: Locations.Menu } },
  },
  {
    text: "Спринт",
    link: { pathname: SPRINT, state: { from: Locations.Menu } },
  },
  {
    text: "Угадай слово",
    link: { pathname: OWN_GAME, state: { from: Locations.Menu } },
  },
];

const dictionaryData = [
  { text: "Изучаемые слова", link: `${STUDIED_WORDS}/0/0` },
  { text: "Сложные слова", link: `${DIFFICULT_WORDS}/0/0` },
  { text: "Удаленные слова", link: `${DELETED_WORDS}/0/0` },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 280,
    },
    fullList: {
      width: "auto",
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

interface IMenuProps {
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  closeMenu: Function;
}

const Menu: React.FunctionComponent<IMenuProps> = ({
  open,
  closeMenu,
}: IMenuProps) => {
  const classes = useStyles();
  const [openBook, setOpenBook] = useState(false);
  const [openGame, setOpenGame] = useState(false);
  const [openDictionary, setOpenDictionary] = useState(false);
  const { isAuthenticated } = useTypedSelector((state) => state.auth);

  const handleClickBook = () => setOpenBook(!openBook);
  const handleClickGame = () => setOpenGame(!openGame);
  const handleClickDictionary = () => setOpenDictionary(!openDictionary);

  return (
    <Drawer anchor="left" open={open} onClose={closeMenu(false)}>
      <div className={classes.list} role="presentation">
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button onClick={handleClickBook}>
            <ListItemIcon>
              <CollectionsBookmarkTwoTone />
            </ListItemIcon>
            <ListItemText primary="Учебник" />
            {openBook ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openBook} timeout="auto" unmountOnExit>
            <List component="div" disablePadding onClick={closeMenu(false)}>
              {groupsData.map((item) => {
                return (
                  <LinkContainer key={nanoid()} to={item.link}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <BookmarkTwoTone />
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  </LinkContainer>
                );
              })}
            </List>
          </Collapse>

          <ListItem button onClick={handleClickGame}>
            <ListItemIcon>
              <VideogameAssetTwoTone />
            </ListItemIcon>
            <ListItemText primary="Игры" />
            {openGame ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openGame} timeout="auto" unmountOnExit>
            <List component="div" disablePadding onClick={closeMenu(false)}>
              {gamesData.map((item) => {
                return (
                  <LinkContainer key={nanoid()} to={item.link}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <GamesTwoTone />
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  </LinkContainer>
                );
              })}
            </List>
          </Collapse>

          {isAuthenticated && (
            <>
              <ListItem button onClick={handleClickDictionary}>
                <ListItemIcon>
                  <LibraryBooksTwoTone />
                </ListItemIcon>
                <ListItemText primary="Словарь" />
                {openDictionary ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openDictionary} timeout="auto" unmountOnExit>
                <List component="div" disablePadding onClick={closeMenu(false)}>
                  {dictionaryData.map((item) => {
                    return (
                      <LinkContainer key={nanoid()} to={item.link}>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BookmarkTwoTone />
                          </ListItemIcon>
                          <ListItemText primary={item.text} />
                        </ListItem>
                      </LinkContainer>
                    );
                  })}
                </List>
              </Collapse>

              <LinkContainer to={STATISTICS}>
                <ListItem button onClick={closeMenu(false)}>
                  <ListItemIcon>
                    <EqualizerTwoTone />
                  </ListItemIcon>
                  <ListItemText primary="Статистика" />
                </ListItem>
              </LinkContainer>
            </>
          )}
        </List>
      </div>
    </Drawer>
  );
};

export default Menu;
