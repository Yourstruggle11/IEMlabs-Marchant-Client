import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../style/SignUpScreenStyle.css";
import WarningIcon from "@material-ui/icons/Warning";

//redux import
import { userRegistration } from "../../redux/actions/UserAction";
import { useDispatch, useSelector } from "react-redux";

export default function MainScreenRightSide() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  //getting data from backend through redux
  const { emailCheck, serverError } = useSelector(
    (state) => state.userRegistration
  );

    //active preloader
    useEffect(() =>{
      if(emailCheck){
        setTimeout(function(){
        history.push(`/activate`) 
        },1000)
      }
    }, [emailCheck, history])

  //serverside validation
  useEffect(() => {
    if (serverError !== null) {
      setError(true);
      setErrorMsg("User with this email address already exist!");
    }
  }, [serverError]);

  //Validation Code goes below
  function submitHandler() {
    if (name && email && password) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        if (password.match(/^[A-Za-z]\w{7,14}$/)) {
          setError(false);
          dispatch(userRegistration(name,email, password))
        } else {
          setError(true);
          setErrorMsg(
            "password must be between 7 to 16 characters, use only characters, numeric digits, underscore and first character must be a letter"
          );
        }
      } else {
        setError(true);
        setErrorMsg("This is not the right email");
      }
    } else {
      setError(true);
      setErrorMsg("Please fill all the fields");
    }
  }
  return (
    <>
      <div className="main-inside-right-screen">
        <p>Create your IEMlabs Merchant account</p>
        {error ? (
          <span>
            {" "}
            <WarningIcon
              style={{ color: "#FF0000", fontSize: "1.7rem" }}
            />{" "}
            {errorMsg}
          </span>
        ) : (
          ""
        )}
        <div className="input-box">
          <p>FULL NAME</p>
          <input
            type="text"
            name=""
            id=""
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input-box">
          <p>Email</p>
          <input
            type="email"
            name=""
            id=""
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input-box">
          <p>PASSWORD</p>
          <input
            type="password"
            name=""
            id=""
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="create-account-btn-box">
          <button onClick={submitHandler}>Create account</button>
          <p>
            Have an account?{" "}
            <Link
              style={{ textDecoration: "none", color: "#6772E5" }}
              to="/login"
            >
              {" "}
              Sign in{" "}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
