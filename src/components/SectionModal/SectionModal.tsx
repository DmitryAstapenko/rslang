import { Redirect } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Modal,
  Typography,
} from "@material-ui/core";
import { nanoid } from "@reduxjs/toolkit";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { BACKEND_PATH } from "../../constants/requestParams";
import useHttp from "../../hooks/http.hook";
import "./SectionModal.scss";
import { MAIN } from "../../constants/routes";
import IUserWordData from "../../types/userWords-types";

interface ISectionModalProps {
  setWordList: Dispatch<SetStateAction<IUserWordData[] | undefined>>;
}

const SectionModal: FC<ISectionModalProps> = ({
  setWordList,
}: ISectionModalProps) => {
  const [open, setOpen] = useState(true);
  const { request, loading } = useHttp();
  const getWordList = useCallback(
    async (section: number) => {
      const data = await request(`${BACKEND_PATH}words/group/${section}`);
      setWordList(data);
    },
    [request, setWordList]
  );

  const clickHandler = async (section: number) => {
    await getWordList(section);
    setOpen(false);
  };

  return !open ? (
    <Redirect to={MAIN} />
  ) : (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="modal"
    >
      <div className="modal-content">
        {loading ? (
          <Typography variant="h2">Loading...</Typography>
        ) : (
          <Grid container spacing={3}>
            {[...Array(6)].map((card, i) => {
              return (
                <Grid item xs={6} key={nanoid()}>
                  <Card>
                    <CardActionArea
                      onClick={() => clickHandler(i)}
                      className={`card-action-level-${i + 1}`}
                    >
                      <CardContent>
                        <Typography variant="h5" component="h2">
                          {`Раздел ${i + 1}`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
    </Modal>
  );
};

export default SectionModal;
