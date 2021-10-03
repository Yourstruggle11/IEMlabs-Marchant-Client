import React from 'react'
import "../../style/SignUpScreenStyle.css"



export default function MainScreenLeftSide() {
    return (
        <>
            <div className="main-inside-left-screen">
                <div className="header">
                    <p>IEMlabs <span style={{color:"#7D7D7D"}}>Merchant</span></p>
                </div>
                <div className="description-box">
                    <div className="description-box-child">
                        <p>Get started quickly</p>
                        <p>All you need is your Email to get started!</p>
                    </div>
                    <div className="description-box-child">
                        <p>New way of digital marketing</p>
                        <p>IEMlabs Merchant offer you all that you needed in this puja vacation</p>
                    </div>
                    <div className="description-box-child">
                        <p>Secure Payment Gateway</p>
                        <p>We care about you more than anything! pay with your comfort with our secure payment gateway</p>
                    </div>
                </div>
            </div>
        </>
    )
}
