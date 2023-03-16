import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, sigInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { chekingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( chekingCredentials() );
    }
}


export const startGoogleSigIn = () => {
    return async( dispatch ) => {
        dispatch( chekingCredentials() );
        
        const result = await sigInWithGoogle();
        if( !result.ok) return dispatch(logout( result.errorMessage ));
        
        dispatch( login( result ));
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName }) =>{
    return async( dispatch ) => {
        dispatch( chekingCredentials() );

        const result = await registerUserWithEmailPassword({email, password, displayName });
        if ( !result.ok ) return dispatch( logout( result.errorMessage ));

        dispatch( login( result ));
    }

}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {
        dispatch( chekingCredentials() );

        const result = await loginWithEmailPassword({email, password });

        if( !result.ok ) return dispatch( logout( result.errorMessage ));

        dispatch( login( result ));

    }

}

export const startLogout = () => {
    return async ( dispatch ) => {
         await logoutFirebase();
         dispatch( clearNotesLogout());
         dispatch( logout());
    }
}