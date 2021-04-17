/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useHistory } from "react-router-dom";
import {
  BOOK,
  DELETED_WORDS,
  DIFFICULT_WORDS,
  STUDIED_WORDS,
} from "../../constants/routes";
import {
  GET_USER_DELETED_WORDS_FILTER,
  GET_USER_HARD_WORDS_FILTER,
  GET_USER_LEARN_WORDS_FILTER,
} from "../../constants/request-params";

const useSwitchParams = (page: number) => {
  const {
    location: { pathname },
  } = useHistory();

  let filter = "";
  let wordsPerPage = 0;
  let count = 0;

  if (pathname.includes(BOOK)) {
    filter = JSON.stringify({
      $or: [
        {
          $and: [
            { "userWord.status": { $ne: "deleted" }, page: { $lt: page } },
          ],
        },
        { $and: [{ userWord: null, page: { $lt: page } }] },
      ],
    });
    wordsPerPage = 20;
  } else if (pathname.includes(STUDIED_WORDS)) {
    filter = JSON.stringify(GET_USER_LEARN_WORDS_FILTER);
    wordsPerPage = page === 0 ? 1 : page * 20;
    count = page === 0 ? 0 : 20;
  } else if (pathname.includes(DIFFICULT_WORDS)) {
    filter = JSON.stringify(GET_USER_HARD_WORDS_FILTER);
    wordsPerPage = page === 0 ? 1 : page * 20;
    count = page === 0 ? 0 : 20;
  } else if (pathname.includes(DELETED_WORDS)) {
    filter = JSON.stringify(GET_USER_DELETED_WORDS_FILTER);
    wordsPerPage = page === 0 ? 1 : page * 20;
    count = page === 0 ? 0 : 20;
  }

  return { filter, wordsPerPage, count };
};

export default useSwitchParams;
