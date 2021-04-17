import * as React from "react";
import { nanoid } from "nanoid";
import { Box, Link, Typography } from "@material-ui/core";
import team from "../../constants/team";
import "./Footer.scss";

const Footer: React.FunctionComponent = () => {
  return (
    <Box className="footer" p={1} mt={2}>
      {team.map((member) => {
        return (
          <Box ml={1} mr={1} key={nanoid()}>
            <Typography variant="button">
              <Link href={member.github}>{member.name}</Link>
            </Typography>
          </Box>
        );
      })}
      <Box ml={1} mr={1}>
        <Typography variant="body1">2021</Typography>
      </Box>
      <Box ml={1} mr={1} className="logo">
        <Link href="https://rs.school/js/">
          <img
            src="https://rs.school/images/rs_school_js.svg"
            alt="RS-school"
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
