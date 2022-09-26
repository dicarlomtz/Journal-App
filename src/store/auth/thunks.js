import { async } from "@firebase/util";
import { loginUserWithEmailPassword, loginWithGoogle, logoutFirebase, registerUserWithEmailPassword } from "../../firebase/providers"
import { checkCredentials, login, logout } from "./authSlice"

export const startGoogleLogin = () => {
    return async (dispatch) => {
        dispatch(checkCredentials());

        const result = await loginWithGoogle();

        if (!result.ok) return dispatch(logout(result));

        dispatch(login( result ))
    }
}

export const startEmailPasswordLogin = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkCredentials());

        const result = await loginUserWithEmailPassword({loginEmail: email, password});

        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch(checkCredentials());

        const result = await registerUserWithEmailPassword({ email, password, displayName });

        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result))
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(logout());
    }
}