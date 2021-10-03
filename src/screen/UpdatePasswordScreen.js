import React,{useState,useEffect} from 'react'
import "../style/UpdatePasswordScreenStyle.css"
import {
    useHistory
} from "react-router-dom";

// Import Components
import Preloader from "../components/Preloader"


//import redux
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../redux/actions/ForgotPasswordAction"

export default function UpdatePasswordScreen() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const otpForResetPassword = JSON.parse(localStorage.getItem("otpForResetPassword"))
    const {loading,success} = useSelector((state) => state.updatePassword)

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(success){
            localStorage.removeItem("otpForResetPassword")
            alert("Password Updated Successfully")
            history.push("/login")
        }
    }, [success,history])

    //Validation code goes here
    function submitHandler() {
        if(password !== "" && confirmPassword !== ""){
            if(password === confirmPassword){
                if (password.match(/^[A-Za-z]\w{7,14}$/)) {
                    dispatch(updatePassword(password,otpForResetPassword._id))

                  } else {
                    setErrorMsg(
                      "password must be between 7 to 16 characters, use only characters, numeric digits, underscore and first character must be a letter"
                    );
                  }
            }
            else{
            setErrorMsg("Password and confirm password must be same!")
            }
        }
        else{
            setErrorMsg("Please Fill both field correctly")
        }
    }
    return (
    <>
        <div className="updatePassword">
                <div className="wrapper signup" style={{width:"50rem"}}>
                    <section className="form">
                        <form>
                            <div className="heading">
                                <h1>Reset Your Password</h1>
                                <p>Fill both field correctly</p>
                            </div>
                            {errorMsg? <div className="error_msg">{errorMsg}</div>:""}
                            <div className="field input">
                                <label>New Password</label>
                                <input 
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                type="password" name="password" className="pass" placeholder="Enter New Password" />
                            </div>
                            <div className="field input">
                                <label >Confirm Password</label>
                                <input 
                                value={confirmPassword}
                                onChange={(e)=> setConfirmPassword(e.target.value)}
                                type="password" name="cpassword" className="cpass" placeholder="Confirm Password" />
                            </div>
                            <div className="field signUpBtn">
                                <input 
                                onClick={submitHandler}
                                type="button" value="Update Password" />
                            </div>
                        </form>
                    </section>
                </div>
            </div>
            {loading ? <Preloader /> : ""}
        </>
    )
}
