/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useRef } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";

const useAuthForm = () => {
  const {
    isAuthenticated,
    signInError,
    signUpError,
    loading,
  } = useTypedSelector((state) => state.auth);
  const { signUp, signIn } = useActions();
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    nickname: "",
    userImage: [""],
  });
  const refForm = useRef<ValidatorForm>(null);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const signUpHandler = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    refForm.current?.resetValidations();
    signUp(form);
  };
  const onDrop = (files: File[], picture: string[]) => {
    setForm({ ...form, userImage: picture });
  };

  const signInHandler = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    signIn(form);
  };

  return {
    changeHandler,
    signUpHandler,
    signInHandler,
    onDrop,
    form,
    refForm,
    signInError,
    signUpError,
    isAuthenticated,
    loading,
  };
};

export default useAuthForm;
