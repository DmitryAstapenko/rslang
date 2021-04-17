import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";
import useAuthForm from "../../hooks/useAuthForm";
import { SIGN_UP } from "../../constants/routes";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorText: {
    color: "#f44336",
  },
}));

const Login: React.FunctionComponent = () => {
  const classes = useStyles();
  const {
    signInHandler,
    changeHandler,
    refForm,
    form,
    signInError,
  } = useAuthForm();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <ValidatorForm
          className={classes.form}
          autoComplete="off"
          onSubmit={signInHandler}
          ref={refForm}
        >
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Адрес электронной почты"
            name="email"
            value={form.email}
            autoFocus
            autoComplete="email"
            onChange={changeHandler}
            validators={["minStringLength:1"]}
            errorMessages={["Заполните поле"]}
            error={!!signInError}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={form.password}
            onChange={changeHandler}
            validators={["minStringLength:1"]}
            errorMessages={["Заполните поле"]}
            error={!!signInError}
          />
          <Grid item xs={12}>
            <Typography
              variant="body2"
              gutterBottom
              className={classes.errorText}
            >
              {signInError}
            </Typography>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
          <Grid container justify="flex-end">
            <Grid item component={Link} to={`${SIGN_UP}`}>
              У вас ещё нет аккаунта? Зарегистрируйтесь
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
};

export default Login;
