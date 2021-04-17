/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypeSelector";

const useGetWordsForGame = () => {
  const { aggregatedWords } = useTypedSelector((state) => state.userWords);
  const { gameWords, isGameWordsFetching } = useTypedSelector(
    (state) => state.gameWords
  );
  const { userId, token, isAuthenticated } = useTypedSelector(
    (state) => state.auth
  );

  const {
    aggregateUserWords,
    clearGameWords,
    fetchGameWords,
    fetchAggregatedGameWords,
    fillGameWords,
  } = useActions();

  return {
    userId,
    token,
    isAuthenticated,
    words: aggregatedWords.words,
    aggregateUserWords,
    gameWords,
    isGameWordsFetching,
    fetchGameWords,
    fetchAggregatedGameWords,
    fillGameWords,
    clearGameWords,
  };
};

export default useGetWordsForGame;
