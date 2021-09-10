import createDataContext from "./createDataContext";
import React from 'react'







import { retrieveItem } from "../utils/functions";
// import NetInfo from "@react-native-community/netinfo";





const authReducer = (state, action) => {
    switch (action.type) {
        case 'setLoginData':
            return { ...state, loginData: action.payload }
        default: return state
    }

}


const setLogindataGlobal = dispatch => {
    return () => {
        retrieveItem('login_data')
            .then((v) => {                
                dispatch({ type: 'setLoginData', payload: v })
            })
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    {
        setLogindataGlobal
    },
    {
        loginData: []
    }
)