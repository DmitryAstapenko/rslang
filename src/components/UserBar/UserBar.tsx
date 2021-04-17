import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Button, MenuItem, Avatar, Menu } from "@material-ui/core";
import { Link } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import useTypedSelector from "../../hooks/useTypeSelector";
import useActions from "../../hooks/useActions";
import { SIGN_IN, SIGN_UP } from "../../constants/routes";

const useStyles = makeStyles(() =>
  createStyles({
    userBar: {
      display: "flex",
      alignItems: "center",
    },
    loadbar: {
      width: 120,
    },
  })
);

const UserBar: React.FunctionComponent = () => {
  const classes = useStyles();
  const { isAuthenticated, name, userImage, loading } = useTypedSelector(
    (state) => state.auth
  );
  const { logout, setIsUpdated, resetStat } = useActions();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const show = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {loading ? (
        <LinearProgress color="secondary" className={classes.loadbar} />
      ) : (
        <>
          {" "}
          {isAuthenticated === true ? (
            <div className={classes.userBar}>
              <Avatar
                alt="avatar-img"
                src={userImage[0]}
                onClick={handleMenu}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
              />
              <Button
                color="inherit"
                onClick={handleMenu}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                {name}
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={show}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    logout();
                    setIsUpdated(false);
                    resetStat();
                    setAnchorEl(null);
                  }}
                >
                  Выход
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Button color="inherit" component={Link} to={`${SIGN_IN}`}>
                Вход
              </Button>
              <Button variant="contained" component={Link} to={`${SIGN_UP}`}>
                Регистрация
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default UserBar;
