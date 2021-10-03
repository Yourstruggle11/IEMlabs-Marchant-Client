import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";


function App() {
  const [product, setProduct] = useState({
    name: "souvik sen",
    price: "10",
  });

  const style = {
    btn: {
      background: "red",
      position: "relative",
      left: "50%",
      cursor: "pointer",
    },
  };

  function Pyment(token) {
    console.log(token);
    const body = {
      token,
      product,
    };

    // const headers = {
    // "Content-Type": "application/json"
    // }

    return fetch("http://localhost:5000/payment/paymentgetway", {
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

    <div className="App">
      <StripeCheckout
        name="Three Comma Co." // the pop-in header title
        description="Big Data Stuff" // the pop-in header subtitle
        image="https://www.fillmurray.com/640/360" // the pop-in header image (default none)
        ComponentClass="div"
        panelLabel="Give Money" // prepended to the amount in the bottom pay button
        amount={product.price * 100} // cents
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
        <button className="btn btn-primary" style={style.btn}>
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  );
}

export default App;
