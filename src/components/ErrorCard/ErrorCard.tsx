/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

interface IErrorCardProps {
  message: string;
}

const ErrorCard: React.FunctionComponent<IErrorCardProps> = (
  props: IErrorCardProps
) => {
  const { message } = props;
  return <div />;
};

export default ErrorCard;
