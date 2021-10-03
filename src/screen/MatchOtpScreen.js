import React, {useState} from 'react'
import "../style/MatchOtpScreenStyle.css"
import { useHistory } from "react-router-dom";

export default function MatchOtpScreen() {
    const [code, setCode] = useState("");


    const history = useHistory();

    let email = ""
    if(!JSON.parse(localStorage.getItem("otpForResetPassword"))){
        history.push("/forgotpassword")
    }
    else{
         email = JSON.parse(localStorage.getItem("otpForResetPassword"))
        }
    // console.log(email);
    // console.log(id);
    // if(email === ""){
    //     window.location.reload()
    // }

    function verifyOtp(){
        /*eslint-disable */
        if(email.emailVerificationOtp == code){ 
            history.push("/update-password")
        }
        else{
            alert("this is not the correct Code!")
        }

    }

    function emailChange() {
            localStorage.removeItem("otpForResetPassword")
            // setLoader(true)
            setTimeout(() => {
                alert("somthing is wrong with your network please refresh the page once!")
                history.push("/forgotpassword")
                // setLoader(false)
            }, 2000);

    }
    return (
        <>
        <div className="matchOtp">
            <div className="mainBody">
                <h2>We sent a code to your email</h2>
                <p> Enter the 4-digit verification code sent to <span className="span" style={{ color: "#6772E5" }}>{email ? email.email : "Admin Email"}</span></p>
                <p className="emailChangeBtn" onClick={emailChange}>Change Email</p>
                <div className="input">
                    <input
                        type="text"
                        placeholder="4 digit code"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value)
                        }}
                    />
                </div>
                <button
                     onClick={verifyOtp}
                >
                    VERIFY
                </button>
                <p>If you don't see the email in your inbox, check your spam folder.</p>
            </div>
        </div>
    </>
    )
}
