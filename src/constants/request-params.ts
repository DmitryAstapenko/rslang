const STATUS_DELETED = "deleted";
const STATUS_HARD = "hard";
const NO_STATUS = "empty";

const GET_USER_BOOK_PAGE_FILTER = {
  $or: [{ "userWord.status": { $ne: "deleted" } }, { userWord: null }],
};

const GET_USER_GAME_WORDS_FILTER = {
  $or: [
    { $and: [{ "userWord.status": { $ne: "deleted" }, page: { $lt: 5 } }] },
    { $and: [{ userWord: null, page: { $lt: 5 } }] },
  ],
};

const GET_USER_LEARN_WORDS_FILTER = { "userWord.isLearn": true };
const GET_USER_DELETED_WORDS_FILTER = { "userWord.status": "deleted" };
const GET_USER_HARD_WORDS_FILTER = { "userWord.status": "hard" };

const BACKEND_PATH = "https://rnovikov-rs-lang-back.herokuapp.com/";

const STORAGE_AUTH_NAME = "auth";
const STORAGE_SETTING_NAME = "settings";

export {
  NO_STATUS,
  STATUS_DELETED,
  STATUS_HARD,
  BACKEND_PATH,
  STORAGE_AUTH_NAME,
  STORAGE_SETTING_NAME,
  GET_USER_GAME_WORDS_FILTER,
  GET_USER_BOOK_PAGE_FILTER,
  GET_USER_LEARN_WORDS_FILTER,
  GET_USER_DELETED_WORDS_FILTER,
  GET_USER_HARD_WORDS_FILTER,
};
