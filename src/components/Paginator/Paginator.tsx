/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { Link } from "react-router-dom";
import "./Paginator.scss";
import LinearProgress from "@material-ui/core/LinearProgress";

interface IPaginatorProps {
  route: string;
  currentPage: number;
  pageCount: number;
  isPagesFetching: boolean;
}

const Paginator: React.FunctionComponent<IPaginatorProps> = (
  props: IPaginatorProps
) => {
  const { route, currentPage, pageCount, isPagesFetching } = props;

  return (
    <div className="paginator">
      {isPagesFetching ? (
        <LinearProgress />
      ) : (
        <Pagination
          shape="rounded"
          size="large"
          color="secondary"
          page={currentPage}
          count={pageCount}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`${route}/${item.page - 1}`}
              {...item}
            />
          )}
        />
      )}
    </div>
  );
};

export default Paginator;
