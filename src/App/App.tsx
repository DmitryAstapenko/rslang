import React from "react";
import { Container } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import {
  MAIN,
  BOOK,
  STUDIED_WORDS,
  DIFFICULT_WORDS,
  DELETED_WORDS,
  SAVANNAH,
  AUDIO_CALL,
  SPRINT,
  OWN_GAME,
  STATISTICS,
} from "../constants/routes";
import "./App.scss";
import BookPage from "../pages/BookPage";
import DictionaryPage from "../pages/DictionaryPage";
import {
  GET_USER_DELETED_WORDS_FILTER,
  GET_USER_HARD_WORDS_FILTER,
  GET_USER_LEARN_WORDS_FILTER,
} from "../constants/requestParams";

// Temporary page templates!
const Main: React.FunctionComponent = () => {
  return (
    <>
      <h1>Main Page</h1>
    </>
  );
};

const Statistics: React.FunctionComponent = () => {
  return (
    <>
      <h1>Statistics Page</h1>
    </>
  );
};

const Savannah: React.FunctionComponent = () => {
  return (
    <>
      <h1>Savannah</h1>
    </>
  );
};

const AudioCall: React.FunctionComponent = () => {
  return (
    <>
      <h1>Audio Call</h1>
    </>
  );
};

const Sprint: React.FunctionComponent = () => {
  return (
    <>
      <h1>Sprint</h1>
    </>
  );
};

const OwnGame: React.FunctionComponent = () => {
  return (
    <>
      <h1>Own Game</h1>
    </>
  );
};
// Temporary page templates!

const App: React.FunctionComponent = () => {
  const isAuthorization = true;

  return (
    <>
      <Header />
      <Container className="main">
        {isAuthorization ? (
          <Switch>
            <Route exact path={MAIN}>
              <Main />
            </Route>
            <Route path={`${BOOK}/:group/:page`}>
              <BookPage />
            </Route>
            <Route path={`${STUDIED_WORDS}/:group/:page`}>
              <DictionaryPage
                header="Изучаемые слова"
                route={STUDIED_WORDS}
                filter={JSON.stringify(GET_USER_LEARN_WORDS_FILTER)}
                learnCategory
              />
            </Route>
            <Route path={`${DIFFICULT_WORDS}/:group/:page`}>
              <DictionaryPage
                header="Сложные слова"
                route={DIFFICULT_WORDS}
                filter={JSON.stringify(GET_USER_HARD_WORDS_FILTER)}
                difficultCategory
              />
            </Route>
            <Route path={`${DELETED_WORDS}/:group/:page`}>
              <DictionaryPage
                header="Удаленные слова"
                route={DELETED_WORDS}
                filter={JSON.stringify(GET_USER_DELETED_WORDS_FILTER)}
                deletedCategory
              />
            </Route>
            <Route path={`${STATISTICS}`}>
              <Statistics />
            </Route>
            <Route path={SAVANNAH}>
              <Savannah />
            </Route>
            <Route path={AUDIO_CALL}>
              <AudioCall />
            </Route>
            <Route path={SPRINT}>
              <Sprint />
            </Route>
            <Route path={OWN_GAME}>
              <OwnGame />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path={MAIN}>
              <Main />
            </Route>
            <Route path={`${BOOK}/:group/:page`}>
              <BookPage />
            </Route>
            <Route path={SAVANNAH}>
              <Savannah />
            </Route>
            <Route path={AUDIO_CALL}>
              <AudioCall />
            </Route>
            <Route path={SPRINT}>
              <Sprint />
            </Route>
            <Route path={OWN_GAME}>
              <OwnGame />
            </Route>
          </Switch>
        )}
      </Container>
    </>
  );
};

export default App;
