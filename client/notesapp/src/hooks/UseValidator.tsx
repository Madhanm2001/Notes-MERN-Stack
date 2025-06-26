// import pattern from '../constants/RegexPattern'

import { useState } from "react"
import pattern from "../constants/RegexPattern"

const UseValidator = () => {

    const signUpValidator = (state: any) => {

        const [signUpError, setSignUpError] = useState({})

        const error: any = {}

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

        setSignUpError(error)

        return {error, signUpError}

    }

    const signInValidator = (state: any) => {

        const [signInError, setSignInError] = useState({})

        const error: any = {}

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

        setSignInError(error)

        return {error, signInError}

    }

    return {signUpValidator,signInValidator}

}

export default UseValidator
