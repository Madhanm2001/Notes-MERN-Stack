import { useState } from "react";
import pattern from "../constants/RegexPattern";

const UseValidator = () => {
  const [signInError, setSignInError] = useState<any>({});
  const [signUpError, setSignUpError] = useState<any>({});

  const signInValidator = (state: any) => {
    const error: any = {};

    if (!state.username) {
      error.username = "Username should not be empty";
    } else if (!pattern.USER_NAME.test(state.username)) {
      error.username = "Invalid username format";
    }

    if (!state.password) {
      error.password = "Password should not be empty";
    } else if (!pattern.PASSWORD.test(state.password)) {
      error.password = "Password should be at least 6 characters";
    }

    setSignInError(error);
    return error
  };

  const signUpValidator = (state: any) => {
    const error: any = {};

    if (!state.username) {
      error.username = "Username should not be empty";
    } else if (!pattern.USER_NAME.test(state.username)) {
      error.username = "Invalid username format";
    }

    if (!state.email) {
      error.email = "Email should not be empty";
    } else if (!pattern.EMAIL.test(state.email)) {
      error.email = "Invalid email format";
    }

    if (!state.password) {
      error.password = "Password should not be empty";
    } else if (!pattern.PASSWORD.test(state.password)) {
      error.password = "Password should be at least 6 characters";
    }

    setSignUpError(error);
    return error
  };

  return {
    signInValidator,
    signUpValidator,
    signInError,
    signUpError,
  };
};

export default UseValidator;
