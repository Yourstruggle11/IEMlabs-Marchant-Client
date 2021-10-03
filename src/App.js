import React, {lazy, Suspense} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Redirect } from 'react-router'


//Import All Screens
// import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import NotfoundPageScreen from "./screen/NotfoundPageScreen";
import SignUpScreen from "./screen/SignUpScreen";
import AccountActivationScreen from "./screen/AccountActivationScreen";
import ForgotPasswordScreen from "./screen/ForgotPasswordScreen";
import MatchOtpScreen from "./screen/MatchOtpScreen";
import UpdatePasswordScreen from "./screen/UpdatePasswordScreen";

// Import components
import Preloader from "./components/Preloader"

// import Redux
import {useSelector} from "react-redux"


// Import Home screen for lazy laoding
const HomeScreen = lazy(() => import("./screen/HomeScreen"))

function App() {
  const { otpForResetPassword } = useSelector((state) => state.sendRecoveryEmail);
  // console.log(otpForResetPassword);
  
  const {userInfo} = useSelector(state => state.userLogin)

  
  return (
    <Router>
      <Switch>
      <Route exact path="/">
        {!userInfo ?  <Redirect to="/login" /> :
          <Suspense fallback={<Preloader />}>
             <HomeScreen />       
          </Suspense>
          }
        </Route>
        <Route exact path="/login">
        {userInfo ? <Redirect to="/" /> :
           <LoginScreen /> } 
        </Route>
        <Route exact path="/register">
          <SignUpScreen />    
        </Route>
        <Route exact path="/activate">
          <AccountActivationScreen />    
        </Route>
        <Route exact path="/forgotpassword">
          <ForgotPasswordScreen />    
        </Route>
        <Route exact path="/reset-password/verify">
        {!otpForResetPassword ? <Redirect to="/forgotpassword" /> : <MatchOtpScreen />   }
        </Route>
        <Route exact path="/update-password">
          <UpdatePasswordScreen />    
        </Route>
        <Route >
           <NotfoundPageScreen />
        </Route>
      </Switch>
    </Router>

  )
}

export default App;
