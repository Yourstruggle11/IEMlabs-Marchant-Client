export const userRegistrationReducer = ( state = {
    loading: false,
    serverError: null,
    userInfo:null,
    emailCheck:false
  }, action) =>{
      switch (action.type) {
          case "USER_REGISTRATION_REQUEST":
              return{
                loading:true,
                serverError: null,
                emailCheck:false
              }
        case "USER_REGISTRATION_SUCCESS":
            return{
                loading: false,
                serverError: null,
                userInfo:action.payload,
                emailCheck:true
            }
      case "USER_REGISTRATION_FAIELD":
          return{
              loading:false,
              serverError: action.payload,
              emailCheck:false
          }
          default:
             return state;
      }
  }

  export const userAccountActivationReducer = ( state = {
    data:{}
  }, action) =>{
      switch (action.type) {
          case "ACTIVE_ACCOUNT":
              return{
                data: action.payload
              }
          default:
             return state;
      }
  }

  export const userAccountDeleteReducer = (state={
    data: {},
 }, action) =>{
   switch (action.type) {
       case "DELETE_ACCOUNT":
           return {
               data: action.payload
           }
   
       default:
           return state;
   }
 }

// END of user registration process

const initialValue = {
    serverError: false,
    isAuthenticate: false,
    loading: false,
 }
export const userLoginReducer = (state={initialValue}, action) =>{
    switch (action.type) {
        case "USER_LOGIN_REQUEST":
            return{
                serverError: false,
                isAuthenticate: false,
                loading: true,
            }
        case "USER_LOGIN_SUCCESS":
            return{
                serverError: false,
                isAuthenticate: true,
                loading: false,
                userInfo: action.payload,
            }
        case "USER_LOGIN_FAILED":
            return{
                loading: false,
                serverError: action.payload,
            }
        case "USER_LOGOUT":
            return{
                isAuthenticate: false,

            }
            
        default:
            return state;
    }
}