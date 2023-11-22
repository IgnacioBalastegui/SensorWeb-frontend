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
        "https://proyecto-backend-web-production.up.railway.app/sensor/api/carts/preference";

      axios.get(URL, config).then((res) => {
        //console.log(res.data)
        setGetId(res.data.id)
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
        "https://proyecto-backend-web-production.up.railway.app/sensor/api/carts/cancel";

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