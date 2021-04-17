import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { SettingsTwoTone } from "@material-ui/icons";
import {
  Box,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Popover,
  Theme,
  Typography,
} from "@material-ui/core";
import useTypedSelector from "../../hooks/useTypeSelector";
import useActions from "../../hooks/useActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    popover: {
      padding: theme.spacing(2),
    },
    form: {
      display: "flex",
      flexDirection: "column",
      rowGap: theme.spacing(1),
    },
  })
);

const BookSettings: React.FunctionComponent = () => {
  const { bookSettings } = useTypedSelector((state) => state.settings);

  const { setSettings, resetSettings } = useActions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...bookSettings, [event.target.name]: event.target.checked });
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton aria-label="settings" onClick={handleClick}>
        <SettingsTwoTone fontSize="large" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={classes.popover}>
          <FormControl component="fieldset">
            <Box mt={1} mb={1}>
              <Typography variant="h6">Настройки учебника:</Typography>
            </Box>
            <FormGroup className={classes.form}>
              <FormControlLabel
                control={
                  <Switch
                    checked={bookSettings.isWordTranslate}
                    onChange={handleChange}
                    name="isWordTranslate"
                  />
                }
                label="Отображать перевод изучаемого слова"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={bookSettings.isSentenceTranslate}
                    onChange={handleChange}
                    name="isSentenceTranslate"
                  />
                }
                label="Отображать перевод предложений"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={bookSettings.isButtons}
                    onChange={handleChange}
                    name="isButtons"
                  />
                }
                label="Отображать кнопки"
              />
            </FormGroup>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={resetSettings}
              >
                Сброс настроек
              </Button>
            </Box>
          </FormControl>
        </div>
      </Popover>
    </>
  );
};

export default BookSettings;
