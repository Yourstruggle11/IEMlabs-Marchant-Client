import React from "react";
import StripeCheckout from "react-stripe-checkout";
import IEMlabsLogo from "../../assets/IEMLabs.jpg"

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const API_URL = process.env.REACT_APP_API;


export default function ProductCard({
  ProductName,
  Price,
  Image,
  Description,
}) {
  //make a funtion to see the images in full size
  function changeIt(_src) {
    window.open(_src, "_blank");
  }
  const product = {
    Name:ProductName,
    price:Price,
  }

  function Pyment(token) {
    console.log(token);
    const body = {
      token,
      product,
    };

    // const headers = {
    // "Content-Type": "application/json"
    // }

    return fetch(`${API_URL}/payment/paymentgetway`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log(status);
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div className="product-card">
        <div className="left-side">
          <LazyLoadImage
            effect="blur"
            onClick={(e) => changeIt(e.target.src)}
            src={Image}
            alt={Image}
            placeholderSrc={IEMlabsLogo}
          />
        </div>
        <div className="right-side">
          <p>{ProductName}</p>
          <p>{Description}</p>
          <div className="price-box">
            <p>Price : {Price} Rs.</p>
            <StripeCheckout
              name="IEMlabs Pvt Ltd." // the pop-in header title
              description="IEMlabs Marchant" // the pop-in header subtitle
              image={IEMlabsLogo}
              ComponentClass="div"
              panelLabel="Confirm Order" // prepended to the amount in the bottom pay button
              amount={Price * 100} // cents
              currency="INR"
              stripeKey={process.env.REACT_APP_PK}
              token={Pyment}
              // locale="zh"
              // email="info@vidhub.co"
              shippingAddress
              billingAddress
              zipCode={false}
              alipay
              bitcoin
              allowRememberMe
            >
              <button>Order Now</button>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </>
  );
}
