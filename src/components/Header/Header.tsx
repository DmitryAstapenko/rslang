import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { MAIN } from "../../constants/routes";
import Menu from "../Menu";
import UserBar from "../UserBar/UserBar";
import Score from "../Score";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 0,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      cursor: "pointer",
    },
  })
);

const Header: React.FunctionComponent = () => {
  const classes = useStyles();

  const [openMenu, setOpenMenu] = useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpenMenu(open);
  };

  return (
    <>
      <Menu open={openMenu} closeMenu={toggleDrawer} />
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <LinkContainer to={MAIN}>
              <Typography variant="h6" className={classes.title}>
                RSLang
              </Typography>
            </LinkContainer>
            <Score />
            <UserBar />
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Header;
