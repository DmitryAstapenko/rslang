/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GET_USER_LEARN_WORDS_FILTER } from "../constants/request-params";
import { UnitStatistics } from "../types/unitStatistics-types";
import IUserWordData from "../types/user-words-types";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";

interface IUseUserDictionaryProps {
  group: number;
  page: number;
  filter: string;
}

const useUserDictionary = (
  props: IUseUserDictionaryProps
): {
  words: IUserWordData[];
  pagesCount: number;
  isFetching: boolean;
  unitStatistics: UnitStatistics;
  isFetchingUnit: boolean;
} => {
  const history = useHistory();
  const { group, page, filter } = props;
  const { userId, token } = useTypedSelector((state) => state.auth);
  const { aggregatedWords, isFetching } = useTypedSelector(
    (state) => state.userWords
  );
  const { unit, isFetching: isFetchingUnit } = useTypedSelector(
    (state) => state.unitStatistics
  );
  const { aggregateUserWords, getUnitStatisticsAction } = useActions();

  useEffect(() => {
    getUnitStatisticsAction(
      group,
      userId,
      token,
      JSON.stringify(GET_USER_LEARN_WORDS_FILTER)
    );
  }, [group]);

  useEffect(() => {
    const { totalCount } = aggregatedWords;
    const { length } = aggregatedWords.words;

    if (!length && !isFetching && page !== 0) {
      history.push(`${history.location.pathname.slice(0, -1)}${page - 1}`);
    }

    if (page + 1 < Math.ceil(totalCount / 20) && length < 20) {
      aggregateUserWords(group, page, filter, userId, token);
    }
  }, [aggregatedWords.words.length]);

  useEffect(() => {
    aggregateUserWords(group, page, filter, userId, token);
  }, [group, page, filter, userId]);

  return {
    words: aggregatedWords.words,
    pagesCount: Math.ceil(aggregatedWords.totalCount / 20),
    isFetching,
    unitStatistics: unit,
    isFetchingUnit,
  };
};

export default useUserDictionary;
