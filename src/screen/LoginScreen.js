import React,{useState,useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom'
import "../style/LoginScreenStyle.css"
import WarningIcon from '@material-ui/icons/Warning';

// Import components
import Preloader from "../components/Preloader"

//redux import
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from '../redux/actions/UserAction';

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();


        //getting data from backend through redux
        const {userInfo, serverError, isAuthenticate, loading} = useSelector((state)=> state.userLogin);

        

        console.log(loading);

        useEffect(() => {
            if(userInfo){
              history.push("/")
            }
          }, [userInfo, history])

          useEffect(() => {
            if(serverError === "Request failed with status code 404"){
              setError(true);
              setErrorMsg("No account associated with this email");
            }
        
          }, [serverError])

          useEffect(() => {
            if(serverError === "Request failed with status code 401"){
              setError(true);
              setErrorMsg("Invalid email or password");
            }
        
          }, [serverError])

        //validation ode goes below
        function submitHandler(){
            if(email && password){
                dispatch(userLogin(email, password));
                if(isAuthenticate){
                      history.push("/")
                }
            }
            else{
              setError(true)
              setErrorMsg("Please fill all the fields")
            }
        };
    return (
        <>
            <div className="LoginScreen">
                <div className="header">
                    <p>IEMlabs <span style={{color:"#7D7D7D"}}>Merchant</span></p>
                </div>
                <div className="main-login-box">
                    {error ? <span> <WarningIcon style={{color:"#FF0000", fontSize:"1.7rem"}}/> {errorMsg}</span> : ""} 
                    <div className="heading">
                        <p>Sign in to your account</p>
                    </div>
                    <div className="input-box">
                        <p>Email</p>
                        <input 
                        type="email" 
                        name="" 
                        id=""
                        value={email}
                        onChange={(e)=>{
                         setEmail(e.target.value)
                        }} 
                        />
                    </div>
                    <div className="input-box">
                        <div className="label">
                            <p>PASSWORD</p>
                            <Link to="/forgotpassword"  style={{textDecoration:"none", color:"#6772E5"}}><p style={{ color:"#6772E5"}}>Forgot your password?</p> </Link>
                        </div>
                        <input 
                        type="password" 
                        name="" 
                        id=""
                        value={password}
                        onChange={(e)=>{
                        setPassword(e.target.value)
                        }} 
                        />
                    </div>
                    <div className="button-box">
                        <button
                        onClick={submitHandler} 
                        >Continue</button>
                    </div>
                </div>
                <div className="footer">
                    <p>Don't have an account? <Link style={{textDecoration:"none", color:"#6772E5"}} to="/register"> Sign up </Link></p>
                </div>
            </div>
            { loading ? <Preloader /> : ""}
        </>
    )
}
