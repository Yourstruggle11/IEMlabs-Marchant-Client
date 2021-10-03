import axios from "axios";

export const userRegistration = (username, email, password) => async (dispatch) =>{
    try {
        dispatch({
            type:"USER_REGISTRATION_REQUEST",
        });
        const config = {
            "Content-type": "application/json",    
        }
        const {data} = await axios.post(
                                        "https://iemlabs-merchant-server.herokuapp.com/useAccount/signup",
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
            `https://iemlabs-merchant-server.herokuapp.com/useAccount/accountActivation/${id}`,
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
            `https://iemlabs-merchant-server.herokuapp.com/useAccount/${id}`,
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
            "https://iemlabs-merchant-server.herokuapp.com/useAccount/login",
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
