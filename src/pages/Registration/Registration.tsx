import React from "react";
import ImageUploader from "react-images-upload";
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
import { SIGN_IN } from "../../constants/routes";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorText: {
    color: "#f44336",
  },
}));

const Registration: React.FunctionComponent = () => {
  const classes = useStyles();
  const {
    signUpHandler,
    changeHandler,
    onDrop,
    form,
    refForm,
    signUpError,
  } = useAuthForm();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <ValidatorForm
          className={classes.form}
          onSubmit={signUpHandler}
          autoComplete="off"
          ref={refForm}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Адрес электронной почты"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={changeHandler}
                validators={["minStringLength:1", "isEmail"]}
                errorMessages={[
                  "Заполните поле",
                  "Недопустимое значение поля email",
                ]}
                error={!!signUpError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="nickname"
                label="Псевдоним"
                name="nickname"
                autoComplete="nickname"
                value={form.nickname}
                onChange={changeHandler}
                validators={["minStringLength:1", "maxStringLength:200"]}
                errorMessages={[
                  "Заполните поле",
                  "Максимальная длина 200 символов",
                ]}
                error={!!signUpError}
              />
            </Grid>

            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="name"
                label="ФИО"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={changeHandler}
                validators={["minStringLength:1", "maxStringLength:200"]}
                errorMessages={[
                  "Заполните поле",
                  "Максимальная длина 200 символов",
                ]}
                error={!!signUpError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={form.password}
                onChange={changeHandler}
                validators={["minStringLength:8"]}
                errorMessages={["Минимальная длина пароля 8 символов"]}
                error={!!signUpError}
              />
            </Grid>

            <Grid item xs={12} />
            <ImageUploader
              withPreview
              singleImage
              withIcon
              label="Максимальный размер файла: 5 МБ, разрешено: jpg | jpeg | png"
              buttonText="Выберите изображение"
              onChange={onDrop}
              imgExtension={[".jpg", ".jpeg", ".png"]}
              maxFileSize={5242880}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              gutterBottom
              className={classes.errorText}
            >
              {signUpError}
            </Typography>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Зарегистрироваться
          </Button>
          <Grid container justify="flex-end">
            <Grid item component={Link} to={`${SIGN_IN}`}>
              У вас уже есть аккаунта? Войдите
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
};

export default Registration;
