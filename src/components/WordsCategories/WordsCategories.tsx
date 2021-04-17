import { Button, Typography } from "@material-ui/core";
import { nanoid } from "nanoid";
import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { BookmarkTwoTone } from "@material-ui/icons";
import "./WordsCategories.scss";

interface IWordsCategoriesProps {
  count: number;
  route: string;
}

const WordsCategories: React.FunctionComponent<IWordsCategoriesProps> = (
  props: IWordsCategoriesProps
) => {
  const { count, route } = props;

  return (
    <div className="group-links">
      {[...Array(count)].map((item, index) => {
        return (
          <Button
            key={nanoid()}
            variant="contained"
            className={`group-links__button-link card-action-level-${
              index + 1
            }`}
            component={Link}
            to={`${route}/${index}/0`}
            startIcon={<BookmarkTwoTone />}
          >
            <Typography variant="h6" component="h3">
              {`Раздел ${index + 1}`}
            </Typography>
          </Button>
        );
      })}
    </div>
  );
};

function mapStateToProps(state: { categories: { count: number } }) {
  return {
    count: state.categories.count,
  };
}

export default connect(mapStateToProps)(WordsCategories);
