import React from "react";
import { useParams } from "react-router-dom";
import { Box, LinearProgress } from "@material-ui/core";
import WordsList from "../../components/WordsList";
import useUserDictionary from "../../hooks/useUserDictionary";
import WordsCategories from "../../components/WordsCategories";
import BookHeader from "../../components/BookHeader";
import PageStatistics from "../../components/PageStatistics";
import UnitStatistics from "../../components/UnitStatistics";
import "./Dictionary.scss";

export interface IDictionaryParams {
  group: string;
  page: string;
}

export interface IDictionaryProps {
  header: string;
  route: string;
  filter: string;
  difficultCategory?: boolean;
  learnCategory?: boolean;
  deletedCategory?: boolean;
}

const Dictionary: React.FunctionComponent<IDictionaryProps> = (
  props: IDictionaryProps
) => {
  const { group, page } = useParams<IDictionaryParams>();
  const {
    header,
    route,
    filter,
    difficultCategory,
    learnCategory,
    deletedCategory,
  } = props;
  const {
    words,
    pagesCount,
    isFetching,
    unitStatistics,
    isFetchingUnit,
  } = useUserDictionary({
    group: Number(group),
    page: Number(page),
    filter,
  });

  return (
    <>
      <WordsCategories route={route} />
      <BookHeader name={header} group={+group} />
      {learnCategory && (
        <Box mt={2}>
          {!isFetchingUnit ? (
            <div className="dictionary-statistics">
              <UnitStatistics group={+group} unit={unitStatistics} />
              <PageStatistics group={+group} page={+page} words={words} />
            </div>
          ) : (
            <LinearProgress />
          )}
        </Box>
      )}
      <WordsList
        route={route}
        group={Number(group)}
        page={Number(page)}
        words={words}
        pagesCount={pagesCount}
        isFetching={isFetching}
        isPagesFetching={false}
        difficultCategory={difficultCategory}
        learnCategory={learnCategory}
        deletedCategory={deletedCategory}
      />
    </>
  );
};

Dictionary.defaultProps = {
  difficultCategory: false,
  learnCategory: false,
  deletedCategory: false,
};

export default Dictionary;
