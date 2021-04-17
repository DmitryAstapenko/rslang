/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useHistory } from "react-router-dom";
import Locations from "../../constants/locations";
import { MAIN } from "../../constants/routes";

const useBackTo = () => {
  const history = useHistory<{ from: Locations }>();

  const backToPreviousPage = () => history.goBack();
  const backToMain = () => {
    if (!history.location.state?.from) history.push(MAIN);
  };

  return {
    backToPreviousPage,
    backToMain,
  };
};

export default useBackTo;
