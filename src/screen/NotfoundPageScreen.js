import React from 'react'
import notFound from "../assets/notFoundSvg.svg"
import "../style/NotfoundPageScreenStyle.css"

export default function NotfoundPageScreen() {
    return (
        <>
            <div className="notFound">
                <div className="mainBody">
                    <img src={notFound} alt="notFound" />
                    <h2>OPPS !</h2>
                    <p>The page you are requested could not be found!</p>
                    <button>Go to Home</button>
                </div>
            </div>
        </>
    )
}
