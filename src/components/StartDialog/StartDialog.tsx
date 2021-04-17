import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { BookmarkTwoTone } from "@material-ui/icons";
import Backdrop from "@material-ui/core/Backdrop";
import "./StartDialog.scss";

const groups = [
  { text: "Раздел 1", color: "#f6d258" },
  { text: "Раздел 2", color: "#efcec5" },
  { text: "Раздел 3", color: "#d1af94" },
  { text: "Раздел 4", color: "#97d5e0" },
  { text: "Раздел 5", color: "#88b14b" },
  { text: "Раздел 6", color: "#ef562d" },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export interface IStartDialogProps {
  open: boolean;
  group: number | null;
  selectGroup: (value: number) => void;
}

const StartDialog: React.FunctionComponent<IStartDialogProps> = (
  props: IStartDialogProps
) => {
  const classes = useStyles();
  const { selectGroup, open, group } = props;
  const [isSelectedGroup, setIsSelectedGroup] = useState<boolean>(false);
  const handleListItemClick = (value: number) => {
    if (!isSelectedGroup) selectGroup(value);
    setIsSelectedGroup(true);
  };

  return (
    <Backdrop open={open}>
      <div className="dialog">
        {groups.map((item, index) => (
          <Button
            onClick={() => handleListItemClick(index)}
            key={item.text}
            style={{ backgroundColor: item.color }}
            variant="contained"
            size="large"
            startIcon={
              isSelectedGroup && group === index ? "" : <BookmarkTwoTone />
            }
          >
            {isSelectedGroup && group === index ? (
              <div className={classes.root}>
                <LinearProgress />
              </div>
            ) : (
              item.text
            )}
          </Button>
        ))}
      </div>
    </Backdrop>
  );
};

export default StartDialog;
