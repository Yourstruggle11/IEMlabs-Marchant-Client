import React from "react";
import "../style/SignUpScreenStyle.css";



//Import all components
import MainScreenLeftSide from "../components/SignUpScreenComponents/MainScreenLeftSide";
import MainScreenRightSide from "../components/SignUpScreenComponents/MainScreenRightSide";
import Preloader from "../components/Preloader"


// Import Redux
import {  useSelector } from "react-redux";

export default function SignUpScreen() {

   //getting data from backend through redux
   const {  loading } = useSelector(
    (state) => state.userRegistration
  );
  console.log(loading);

  return (
    <>
      <div className="SignUpScreen">
        <div className="main-screen">
          <MainScreenLeftSide />
          <MainScreenRightSide />
        </div>
      </div>
      {loading ? <Preloader /> : ""}
    </>
  );
}
