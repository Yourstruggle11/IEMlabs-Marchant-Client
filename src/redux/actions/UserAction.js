import axios from "axios";

const API_URL = process.env.REACT_APP_API;

console.log(API_URL);


export const userRegistration = (username, email, password) => async (dispatch) =>{
    try {
        dispatch({
            type:"USER_REGISTRATION_REQUEST",
        });
        const config = {
            "Content-type": "application/json",    
        }
        const {data} = await axios.post(
                                        `${API_URL}/user-account/signup`,
                                        {username, email, password},
                                        config
                                        );
        dispatch({
            type:"USER_REGISTRATION_SUCCESS",
            payload: data,
        })
        const now = new Date()
        const item = {
            value: data,
            expiry: now.getTime() + 600000
        }
        localStorage.setItem("registratinInfo", JSON.stringify(item));
    } catch (error) {
        dispatch({
            type:"USER_REGISTRATION_FAIELD",
            payload: error.message,
        })
    }
}

export const userAccountActivation = (id) => async (dispatch) =>{
    try {
        const config = {
            "Content-type": "application/json",
        }
        const data = await axios.put(
            `${API_URL}/user-account/account-activation/${id}`,
            config
        )
        dispatch({
            type:"ACTIVE_ACCOUNT",
            payload:data
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const userAccountDelete = (id) => async (dispatch) =>{
    try {
        const config = {
            "Content-type": "application/json",    
        }
        const {data} = await axios.delete(
            `${API_URL}/user-account/${id}`,
            config
        )
        dispatch({
            type:"DELETE_ACCOUNT",
            payload:data
        })
    } catch (error) {
        console.log(error.message);
    }
}


// END of user registration process

export const userLogin = (email,password) => async (dispatch) =>{
    try {
        dispatch({
            type:"USER_LOGIN_REQUEST",
        });
        const config = {
            "Content-type": "application/json", 
        }
        const data = await axios.post(
            `${API_URL}/user-account/login`,
             {email,password},
             config
             )
             localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch({
            type:"USER_LOGIN_SUCCESS",
            payload:data
        })
    } catch (error) {
        dispatch({
            type:"USER_LOGIN_FAILED",
            payload:error.message
        });
    }
}

// logout action
export const userLogout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({
      type: "USER_LOGOUT",
    });
  };
