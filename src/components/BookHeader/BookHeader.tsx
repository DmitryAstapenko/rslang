import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import "./BookHeader.scss";
import { Paper } from "@material-ui/core";
import BookSettings from "../Settings";

interface IBookHeaderProps {
  name: string;
  group: number;
}

const BookHeader: React.FunctionComponent<IBookHeaderProps> = ({
  name,
  group,
}: IBookHeaderProps) => {
  return (
    <Paper elevation={3} className={`group-action-level-${group + 1}`}>
      <Box className="book-header" marginTop={2} padding={2}>
        <Box>
          <Typography variant="h4" component="h2">
            {`${name} > Раздел ${group + 1}`}
          </Typography>
        </Box>
        <Box>
          <BookSettings />
        </Box>
      </Box>
    </Paper>
  );
};

export default BookHeader;
