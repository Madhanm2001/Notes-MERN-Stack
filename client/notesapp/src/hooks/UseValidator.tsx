import { useState } from "react";
import pattern from "../constants/RegexPattern";

const UseValidator = () => {

  const signInValidator = (state: any) => {
    const error: any = {};

    if (!state.usernameoremail) {
      error.usernameoremail = "username or email should not be empty";
    } else if (!pattern.USER_NAME.test(state.usernameoremail) && !pattern.EMAIL.test(state.usernameoremail)) {
      error.usernameoremail = "Invalid username or email";
    }

    if (!state.password) {
      error.password = "Password should not be empty";
    } else if (!pattern.PASSWORD.test(state.password)) {
      error.password = "Password should be at least 6 characters";
    }
    return error
  };

  const signUpValidator = (state: any) => {
    const error: any = {};

    if (!state.username) {
      error.username = "Username should not be empty";
    } else if (!pattern.USER_NAME.test(state.username)) {
      error.username = "Invalid username format";
    }

    if (!state.name) {
      error.name = "name should not be empty";
    } else if (!pattern.NAME.test(state.name)) {
      error.name = "Invalid name format";
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
    if (!state.confirmPassword) {
      error.confirmPassword = "confirmPassword should not be empty";
    } else if (!pattern.PASSWORD.test(state.confirmPassword)) {
      error.confirmPassword = "confirmPassword should be at least 6 characters";
    }
    else if(state.password!=state.confirmPassword){
      error.confirmPassword = "confirmPassword should be same as password";
    }
    if (!state.phoneNumber) {
      error.phoneNumber = "phonenumber should not be empty";
    } else if (!pattern.PHONE_NUMBER.test(state.phoneNumber)) {
      error.phoneNumber = "phonenumber should be valid";
    }

    console.log(error)
    return error
  };

  const ChangePasswordValidator = (state: any) => {
    const error: any = {};

    if (!state.newPassword) {
      error.newPassword = "new Password should not be empty";
    } else if (!pattern.PASSWORD.test(state.oldPassword)) {
      error.newPassword = "new Password should be at least 6 characters";
    }

    if (!state.oldPassword) {
      error.oldPassword = "old Password should not be empty";
    } else if (!pattern.PASSWORD.test(state.oldPassword)) {
      error.oldPassword = "old Password should be at least 6 characters";
    }
    return error
  };

  const profileValidator = (state: any) => {
    const error: any = {};
    if (!state.username) {
      error.username = "Username should not be empty";
    } else if (!pattern.USER_NAME.test(state.username)) {
      error.username = "Invalid username format";
    }
    if (!state.name) {
      error.name = "name should not be empty";
    } else if (!pattern.NAME.test(state.name)) {
      error.name = "Invalid name format";
    }
    if (!state.email) {
      error.email = "Email should not be empty";
    } else if (!pattern.EMAIL.test(state.email)) {
      error.email = "Invalid email format";
    }
    if (!state.phoneNumber) {
      error.phoneNumber = "phonenumber should not be empty";
    } else if (!pattern.PHONE_NUMBER.test(state.phoneNumber)) {
      error.phoneNumber = "phonenumber should be valid";
    }

    console.log(error)
    return error
  };

  const folderValidator = (state: any) => {
    const error: any = {};

    if (!state.name) {
      error.name = "title should not be empty";
    } else if (!pattern.FOLDER_NAME.test(state.name)) {
      error.name = "invalid title format";
    }
    
    if (!pattern.FOLDER_CATEGORY.test(state.category)) {
      error.category = "invalid category format";
    }
    console.log(error)
    return error
  };

  const noteValidator = (state: any) => {
    const error: any = {};

    if (!state.name) {
      error.name = "title should not be empty";
    } else if (!pattern.FOLDER_NAME.test(state.name)) {
      error.name = "invalid title format";
    }
    
    if (!state.content) {
      error.content = "content should not empty";
    }
    console.log(error)
    return error
  };


  return {
    signInValidator,
    signUpValidator,
    profileValidator,
    ChangePasswordValidator,
    noteValidator,
    folderValidator
  };
};

export default UseValidator;
