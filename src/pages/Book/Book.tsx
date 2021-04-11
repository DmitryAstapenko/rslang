/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link, useParams } from "react-router-dom";
import WordsCategories from "../../components/WordsCategories";
import WordsList from "../../components/WordsList";
import Locations from "../../constants/locations";
import { BOOK, SAVANNAH } from "../../constants/routes";
import useBook from "../../hooks/useBook";

export interface IBookParams {
  group: string;
  page: string;
}

const Book: React.FunctionComponent = () => {
  const { group, page } = useParams<IBookParams>();

  const { words, isFetching } = useBook({
    group: Number(group),
    page: Number(page),
  });

  const props = {
    route: BOOK,
    group: Number(group),
    page: Number(page),
    words,
    pagesCount: 30,
    isFetching,
    isPagesFetching: false,
  };

  return (
    <>
      <h1>
        Book Group: {group} Page: {page}
      </h1>
      <WordsCategories route={BOOK} />
      <Link to={{ pathname: SAVANNAH, state: { from: Locations.Book } }}>
        GAME
      </Link>
      <WordsList {...props} />
    </>
  );
};

export default Book;
