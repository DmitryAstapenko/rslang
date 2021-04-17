/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";

interface IBookProps {
  group: number;
  page: number;
}

const useBook = (props: IBookProps) => {
  const { group, page } = props;
  const { aggregatedWords, isFetching } = useTypedSelector(
    (state) => state.userWords
  );
  const { fetchWords } = useActions();

  useEffect(() => {
    fetchWords(group, page);
  }, [group, page]);

  return {
    words: aggregatedWords.words,
    isFetching,
  };
};

export default useBook;
