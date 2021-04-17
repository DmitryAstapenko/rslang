/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import WordCard from "../WordCard";
import Paginator from "../Paginator";
import IUserWordData from "../../types/user-words-types";
import "./WordList.scss";
import useSwitchParams from "./useSwitchParams";
import LinksGames from "../LinksGames";

interface IWordsListProps {
  route: string;
  group: number;
  page: number;
  words: IUserWordData[];
  pagesCount: number;
  isFetching: boolean;
  isPagesFetching: boolean;
  difficultCategory?: boolean;
  learnCategory?: boolean;
  deletedCategory?: boolean;
}

const WordsList: React.FunctionComponent<IWordsListProps> = (
  props: IWordsListProps
) => {
  const {
    route,
    group,
    page,
    words,
    pagesCount,
    isFetching,
    isPagesFetching,
    difficultCategory,
    learnCategory,
    deletedCategory,
  } = props;

  const { filter, wordsPerPage, count } = useSwitchParams(page);

  return (
    <>
      <Paginator
        route={`${route}/${group}`}
        currentPage={page + 1}
        pageCount={pagesCount}
        isPagesFetching={isPagesFetching}
      />
      {isFetching ? (
        <Box mt={2}>
          <LinearProgress />
        </Box>
      ) : (
        <>
          {words.length ? (
            <>
              <LinksGames
                group={group}
                page={page}
                filter={filter}
                wordsPerPage={wordsPerPage}
                count={count}
              />
              <div className="word-list">
                {words.map((word) => {
                  return (
                    <WordCard
                      key={word._id}
                      word={word}
                      difficultCategory={difficultCategory}
                      learnCategory={learnCategory}
                      deletedCategory={deletedCategory}
                    />
                  );
                })}
              </div>
              <LinksGames
                group={group}
                page={page}
                filter={filter}
                wordsPerPage={wordsPerPage}
                count={count}
              />
            </>
          ) : (
            <Box mt={2}>
              <Alert severity="warning">В разделе нет слов!</Alert>
            </Box>
          )}
        </>
      )}
      <Paginator
        route={`${route}/${group}`}
        currentPage={page + 1}
        pageCount={pagesCount}
        isPagesFetching={isPagesFetching}
      />
    </>
  );
};

WordsList.defaultProps = {
  difficultCategory: false,
  learnCategory: false,
  deletedCategory: false,
};

export default WordsList;
