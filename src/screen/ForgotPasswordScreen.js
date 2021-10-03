import React, { useEffect, useState } from "react";
import "../style/ForgotPasswordScreenStyle.css"
import { Link,useHistory } from "react-router-dom";

// import components
import Preloader from "../components/Preloader"

//import redux
import { useDispatch, useSelector } from "react-redux";
import { sendRecoveryEmail } from "../redux/actions/ForgotPasswordAction"

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { loading, serverValidation} = useSelector((state) => state.sendRecoveryEmail);
  // const { otpForResetPassword } = useSelector((state) => state.sendRecoveryEmail);
  const otpForResetPassword = JSON.parse(localStorage.getItem("otpForResetPassword"))

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (otpForResetPassword) {
        history.push("/reset-password/verify")
    }
}, [otpForResetPassword, history])

useEffect(() => {
    if (serverValidation) {
        setErrorMsg(`We couldn't find an account associated with ${email}. Please try with an alternate email.`)
    }
}, [serverValidation, email])


function submitHande() {
  if (email !== "") {
      dispatch(sendRecoveryEmail(email))
      setTimeout(()=>{
        history.push("/reset-password/verify")
      },1000)
  }
  else {
      setErrorMsg("Please provide us your Email")

  }
}

  return (
    <>
      <div className="forgotPassword">
        <main className="forgot_password_page">
          <div className="forgot_password_card">
            {errorMsg ? (
              <div className="error_msg" id="error">
                {errorMsg}
              </div>
            ) : (
              ""
            )}
            <h1 className="heading">Forgot password?</h1>
            <p className="header">Reset password in two quick steps</p>
            <input
              name="userName"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={submitHande}>Reset password</button>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <div className="back_button">Back</div>{" "}
            </Link>
          </div>
        </main>
      </div>
      { loading ? <Preloader /> : ""}
    </>
  );
}
