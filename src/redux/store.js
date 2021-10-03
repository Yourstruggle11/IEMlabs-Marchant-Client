import {createStore,applyMiddleware, combineReducers} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { sendRecoveryEmailReducer, updatePasswordReducer } from "./reducer/ForgotPasswordReducer";
import { userAccountActivationReducer, userAccountDeleteReducer, userLoginReducer, userRegistrationReducer } from "./reducer/UserReducer";


const rootReducer = combineReducers({
    userRegistration: userRegistrationReducer,
    userAccountActivation:userAccountActivationReducer,
    userAccountDelete:userAccountDeleteReducer,
    userLogin:userLoginReducer,
    sendRecoveryEmail:sendRecoveryEmailReducer,
    updatePassword:updatePasswordReducer
})

//getting user data from local storage
const userInfoFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
const otpForResetPasswordFromLocalStorage = JSON.parse(localStorage.getItem("otpForResetPassword"))

const initialState = {
    userLogin:{
        userInfo: userInfoFromLocalStorage
    },
    sendRecoveryEmail:{
        otpForResetPassword:otpForResetPasswordFromLocalStorage
    }
}

const middleware = [thunk]


//Creating store
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;