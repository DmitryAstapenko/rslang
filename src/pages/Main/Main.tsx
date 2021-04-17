/* eslint-disable react/no-array-index-key */
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link as LinkMaterial,
  ListSubheader,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import {
  LibraryBooksTwoTone,
  EqualizerTwoTone,
  VideogameAssetTwoTone,
  CollectionsBookmarkTwoTone,
} from "@material-ui/icons";
import "./Main.scss";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { SIGN_IN } from "../../constants/routes";
import team from "../../constants/team";
import useTypedSelector from "../../hooks/useTypeSelector";

const Main: React.FunctionComponent = () => {
  const { isAuthenticated, loading } = useTypedSelector((state) => state.auth);

  return (
    <main className="main-page">
      <Box mt={4}>
        <Typography variant="h4" component="h3">
          Учить английский легко вместе с RSLang!
        </Typography>
      </Box>
      <Box mt={8}>
        <Typography variant="h4" component="h3">
          {isAuthenticated || loading ? null : (
            <>
              <Link to={SIGN_IN}>Авторизируйся</Link> и:
            </>
          )}
        </Typography>
      </Box>
      <Box mt={4} className="main-page__info-cards">
        <Paper className="main-page__info-cards_card">
          <LibraryBooksTwoTone fontSize="large" />
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">
            Изучи 3600 часто употребляемых английских слов
          </Typography>
        </Paper>
        <Paper className="main-page__info-cards_card">
          <VideogameAssetTwoTone fontSize="large" />
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">
            Прокачивай свой уровень играя в игры
          </Typography>
        </Paper>
        <Paper className="main-page__info-cards_card">
          <CollectionsBookmarkTwoTone fontSize="large" />
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">
            Составляй свой собственный словарь
          </Typography>
        </Paper>
        <Paper className="main-page__info-cards_card">
          <EqualizerTwoTone fontSize="large" />
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">
            Оценивай свои успехи в персональной статистике
          </Typography>
        </Paper>
      </Box>
      <Box mt={8}>
        <Typography variant="h4" component="h3">
          Посмотри видео и ознакомься с функциональностью приложения!
        </Typography>
      </Box>
      <Box mt={4}>
        <Paper className="main-page__video">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=9_iF3jxo7P4"
            width="100%"
            height="100%"
            controls
            className="react-player"
          />
        </Paper>
      </Box>
      <Box mt={8}>
        <Typography variant="h4" component="h3">
          О комманде:
        </Typography>
      </Box>
      <Box className="main-page__team-cards" mt={4}>
        {team.map((member) => {
          return (
            <Card key={nanoid()} className="main-page__team-cards_card">
              <CardHeader
                avatar={<Avatar src={member.cover} aria-label="recipe" />}
                title={
                  <>
                    <Typography>
                      <LinkMaterial href={member.github}>
                        {member.name}
                      </LinkMaterial>
                    </Typography>
                  </>
                }
                subheader={
                  <>
                    <Typography variant="inherit">{member.role}</Typography>
                  </>
                }
              />
              <Divider />
              <CardContent>
                {" "}
                <List
                  dense={false}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Вклад в проект:
                    </ListSubheader>
                  }
                >
                  {member.desc.map((item) => {
                    return (
                      <ListItem key={nanoid()}>
                        <ListItemIcon>
                          <DoneAllIcon />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </main>
  );
};

export default Main;
