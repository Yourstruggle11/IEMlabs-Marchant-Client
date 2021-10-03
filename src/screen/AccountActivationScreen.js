import React,{useState} from 'react'
import "../style/AccountActivationScreenStyle.css"
import { useHistory } from "react-router-dom";


//redux import
import { userAccountActivation,userAccountDelete } from "../redux/actions/UserAction";
import { useDispatch } from "react-redux";
export default function AccountActivationScreen() {
    const [code, setCode] = useState("");

    const dispatch = useDispatch();

    const history = useHistory();

    let id = "";
    let email = ""
    if(!JSON.parse(localStorage.getItem("registratinInfo"))){
        history.push("/register")
    }
    else{
         email = JSON.parse(localStorage.getItem("registratinInfo"))
    
         id = email.value._id
    }
    // console.log(email);
    // console.log(id);
    if(email === ""){
        window.location.reload()
    }

    function verifyOtp(){
        /*eslint-disable */
        const now = new Date()

        if(now.getTime() > email.expiry){
            alert("OTP has expired! try sign up again!")
            dispatch(userAccountDelete(id))
            if(dispatch){
                localStorage.removeItem("registratinInfo")
                history.push("/register")
            }
        }
        else{
            if(email.value.emailVerificationOtp == code){ 
                localStorage.removeItem("registratinInfo")
                dispatch(userAccountActivation(id))
                history.push("/login")
            }
            else{
                alert("this is not the correct Code!")
            }
        }

    }
    function emailChange() {
        dispatch(adminAccountDelete(id))
        if(dispatch){
            history.push("/adminSignup")
            localStorage.removeItem("registratinInfo")
        }
    }
    /*eslint-disable */
    return (
        <>
             <div className="activation">
                <div className="mainBody">
                    <h2>We sent a code to your email</h2>
                    <p> Enter the 4-digit verification code sent to <span className="span" style={{color:"#6772E5"}}>{/*email ? email.value.email : "Admin Email"*/}</span></p>
                    <p className="emailChangeBtn">Change Email</p>
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
