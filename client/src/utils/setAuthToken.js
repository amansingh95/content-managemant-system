import axios from "axios";

const setAuthToken=token=>{
    if(token){
        axios.defaults.headers.common['token-no']=token;
    }else{
        delete axios.defaults.headers.common['token-no'];
    }
};
export default setAuthToken;