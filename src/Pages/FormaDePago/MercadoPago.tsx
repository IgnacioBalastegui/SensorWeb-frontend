import axios from 'axios';
import './formaDePago.css';

import { useEffect, useState } from 'react';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useNavigate } from 'react-router-dom';
import RUTA from '../../routes';

//initMercadoPago('YOUR_PUBLIC_KEY');
initMercadoPago('TEST-410f3611-466c-438b-97ee-5b3a122579b9', {
  locale: "es-AR"
});

export const MercadoPago = () => {

  // link YT: https://www.youtube.com/watch?v=vXqo-hgvvZU
  /**
   
  //link: https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/integrate-checkout-pro#editor_23

   //npm install mercadopago
   
   // SDK de Mercado Pago
  const mercadopago = require("mercadopago");
  // Agrega credenciales
  mercadopago.configure({
access_token: "PROD_ACCESS_TOKEN",
});

// Crea un objeto de preferencia
let preference = {
items: [
  {
    title: "Mi producto",
    unit_price: 100,
    quantity: 1,
  },
],
};

mercadopago.preferences
.create(preference)
.then(function (response) {
  // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
})
.catch(function (error) {
  console.log(error);
});


//Para incluir el SDK de Mercado Pago.js, agrega el siguiente código al HTML del proyecto o instale la biblioteca para ReactJs.
        
// SDK MercadoPago.js
<script src="https://sdk.mercadopago.com/js/v2"></script>

const mp = new MercadoPago('YOUR_PUBLIC_KEY');
const bricksBuilder = mp.bricks();


//Para las integraciones de JavaScript/HTML, a través de CDN, deberá crear un contenedor de identificador para definir la ubicación donde se insertará el botón en la pantalla. La creación del contenedor se realiza insertando un elemento en el código HTML de la página en la que se representará el componente.

<div id="wallet_container"></div>

mp.bricks().create("wallet", "wallet_container", {
 initialization: {
     preferenceId: "<PREFERENCE_ID>",
 },
});
------------------------------------------------------------------------------------------------------------------------------------
   */


  /**
   
  //link: https://github.com/mercadopago/checkout-payment-sample/blob/master/server/node/server.js
  
   const express = require("express");
  const app = express();
  const cors = require("cors");
  const mercadopago = require("mercadopago");
  
  // REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
  mercadopago.configure({
    access_token: "<ACCESS_TOKEN>",
  });
  
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.static("../../client/html-js"));
  app.use(cors());
  app.get("/", function (req, res) {
    res.status(200).sendFile("index.html");
  });
  
  app.post("/create_preference", (req, res) => {
  
    let preference = {
      items: [
        {
          title: req.body.description,
          unit_price: Number(req.body.price),
          quantity: Number(req.body.quantity),
        }
      ],
      back_urls: {
        "success": "http://localhost:8080/feedback",
        "failure": "http://localhost:8080/feedback",
        "pending": "http://localhost:8080/feedback"
      },
      auto_return: "approved",
    };
  
    mercadopago.preferences.create(preference)
      .then(function (response) {
        res.json({
          id: response.body.id
        });
      }).catch(function (error) {
        console.log(error);
      });
  });
  
  app.get('/feedback', function (req, res) {
    res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id
    });
  });
  
  app.listen(8080, () => {
    console.log("The server is now running on Port 8080");
  });
  
  ----------------------------------------------------------------------------------------------------------------
   */


  /**
   codigo del video 
   //link: https://github.com/pab-mchn/mercado-pago-javascript-simple-integration/blob/master/server/server.js
  
   const express = require("express");
  const app = express();
  const cors = require("cors");
  const path = require("path");
  
  const mercadopago = require("mercadopago");
  
  // REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
  mercadopago.configure({
    access_token: "your_secret_key",
  });
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.use(express.static(path.join(__dirname, "../client")));
  app.use(cors());
  
  app.get("/", function (req, res) {
    const filePath = path.resolve(__dirname, "..", "client", "index.html");
    res.sendFile(filePath);
  });
  
  app.post("/create_preference", (req, res) => {
    let preference = {
      items: [
        {
          title: req.body.description,
          unit_price: Number(req.body.price),
          quantity: Number(req.body.quantity),
        },
      ],
      back_urls: {
        success: "http://localhost:8080",
        failure: "http://localhost:8080",
        pending: "",
      },
      auto_return: "approved",
    };
  
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        res.json({
          id: response.body.id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  
  app.get("/feedback", function (req, res) {
    res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
    });
  });
  
  app.listen(8080, () => {
    console.log("The server is now running on Port 8080");
  });
  
  --------------------------------------------------------------------------------------------
   */



  /**
   lado del front
  
   const mercadopago = new MercadoPago("your_public_key", {
    locale: "es-AR", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
  });
  
  document.getElementById("checkout-btn").addEventListener("click", function () {
    const orderData = {
      quantity: document.getElementById("quantity").innerHTML,
      description: document.getElementById("product-description").innerHTML,
      price: document.getElementById("unit-price").innerHTML,
    };
  
    fetch("http://localhost:8080/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (preference) {
        createCheckoutButton(preference.id);
      })
      .catch(function () {
        alert("Unexpected error");
      });
  });
  
  function createCheckoutButton(preferenceId) {
    // Initialize the checkout
    const bricksBuilder = mercadopago.bricks();
  
    const renderComponent = async (bricksBuilder) => {
      if (window.checkoutButton) window.checkoutButton.unmount();
      await bricksBuilder.create(
        "wallet",
        "button-checkout", // class/id where the payment button will be displayed
        {
          initialization: {
            preferenceId: preferenceId,
          },
          callbacks: {
            onError: (error) => console.error(error),
            onReady: () => {},
          },
        }
      );
    };
    window.checkoutButton = renderComponent(bricksBuilder);
  }
  ----------------------------------------------------------------------------------------------------------------
   */

  const [getId, setGetId] = useState<string>();


  const navigate = useNavigate();



  const getFrontMercadoPago = () => {
    if (localStorage.getItem("token")) {
      const token: string = JSON.stringify(localStorage.getItem("token"));

      const config: any = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      };

      const payload = token.split(".")[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      //const email = values.email;

      const URL: string =
        "http://localhost:8080/sensor/api/carts/preference";

      axios.get(URL, config).then((res) => {
        //console.log(res.data)

        setGetId(res.data.id)

        //la respueste debe mandarse en preferenceId de Wallet


        // navigate(RUTA.COMPRAS_REALIZADAS);
      }).catch(err => {
        console.log("ERROR: " + err)
      });
    }
  };

  useEffect(() => {
    getFrontMercadoPago();
  }, []);



  const volver = () => {
    if (localStorage.getItem("token")) {
      const token: string = JSON.stringify(localStorage.getItem("token"));

      const config: any = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      };

      const payload = token.split(".")[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      //const email = values.email;

      const URL: string =
        "http://localhost:8080/sensor/api/carts/cancel";

      axios.post(URL, {}, config).then((res) => {

        //console.log(res.data)
        navigate(RUTA.CARRITO);

      }).catch(err => {
        console.log("ERROR: " + err)
      });
    }
  }

  return (

    <div className="FormaDePago">

      {/*<div className="texto vistaFormaPago">

        Mercado pago
  </div>*/}


      {<div className="botonMercadoPago" id="wallet_container">
        <Wallet initialization={{ preferenceId: `${getId}`, redirectMode: 'modal' }} />
      </div>}
      <button
        className="btn btn-primary mb-4 botonVolver"
        onClick={volver}
      >
        Volver
      </button>

    </div>
  );
}