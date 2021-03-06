import { REGISTER_FAIL,
     REGISTER_SUCESS,
     USER_LOADED,
     AUTH_ERROR ,
     LOGIN_SUCESS,
     LOGIN_FAIL,
     LOGOUT,
     ACCOUNT_DELETE
 } from "../actions/types";
 
const initialState ={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
};
export default function(state = initialState, action){
    const {type,payload}=action;
    switch(type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }
        case REGISTER_SUCESS:
            case LOGIN_SUCESS:
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            };
        case REGISTER_FAIL:
            case LOGIN_FAIL:
            case LOGOUT:
            case AUTH_ERROR:
            case ACCOUNT_DELETE:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            }
        default:
            return state;
    }
};                                                                                                                                                                                                        