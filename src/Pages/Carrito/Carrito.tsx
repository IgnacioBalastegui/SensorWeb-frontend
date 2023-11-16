import './carrito.css';
import { Link, useNavigate } from "react-router-dom";
import RUTA from "../../routes";
import { useEffect, useState } from 'react';
//import { ICarrito } from './Interface';
import sensor from "../../Images/sensor.jpg";
import axios from 'axios';

import { ItemCarrito } from "./ItemCarrito/ItemCarrito";

interface itemProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  imageBase64?: string;
}

interface cartProducts {
  product: itemProduct,
  quantity: number,
  dateTimeAdded: string,

}

interface Cart {
  state: string,
  paymentMethod: string,
  shippingMethod: string,
  cartProducts: cartProducts
}

interface ICarrito {
  cart: Cart;

  shippingMethodsAndUserAddresses: string;

  paymentMethods: string;
}

interface IBodyNextStep {

  shippingMethodAndAddress: {};

  paymentMethod: any;
}

export const Carrito = () => {
  const [prodCarrito, setProdCarrito] = useState<cartProducts[]>([]);

  const navigate = useNavigate();

  

  const getCarrito = () => {

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
        "http://localhost:8080/sensor/api/carts";

      axios.get(URL, config).then((res) => {


        setProdCarrito(res.data.cart.cartProducts);

        /*console.log("datos CARRITO: " + res.data.cart.cartProducts);

        console.log("dentro del axios: " + prodCarrito)*/

      }).catch(err => {
        console.log("ERROR: " + err)
      });
    }
  };


  const getCheckout = () => {

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
        "http://localhost:8080/sensor/api/carts/next-step";

      const body: IBodyNextStep = {
        shippingMethodAndAddress:
        {
          shippingMethod: null,

          addresses: null
        },
        paymentMethod: null


      }

      axios.post(URL, body, config).then((res) => {
        console.log(res.data)
        navigate(RUTA.FORMAENVIO);
      }).catch(err => {
        console.log("ERROR: " + err)
      });
    }
  };

  useEffect(() => {
    getCarrito();
    //console.log("fuera del axios: "+prodCarrito)
    
  }, [prodCarrito]);

  /*useEffect(() => {
    reset(prodCarrito);
  }, [prodCarrito]);*/

  return (
    <div className="Carrito">

      <div className="texto">

        <div className="col carrito">
          <h3>CARRITO</h3>

          {/*<div className="row carritoContenido"/* key={product.id}*>
            <img src={sensor} alt="product-card" />
            <h3 className="name">{/*product.name*}Producto 1</h3>
            {/*<CartItemCounter product={product} />*}
            <h5 >-</h5>
            <h4 className="quanty">{/*product.price * product.quanty*}1</h4>
            <h5 >+</h5>
            <h4 className="price">{/*product.price * product.quanty*}$20</h4>


            <h3
              className="cart-delete-button"
            /* onClick={() => deleteProduct(product.id)}*
            >
              ❌
            </h3>


          </div>
          <Link to={RUTA.FORMADEPAGO} >
            <button className="btn btn-primary btn-block botonElegirFormaPago">Elegir forma de pago</button>
          </Link>
*/}
          {prodCarrito.length > 0 ? (
            <div className="row margen">
              <table className="table">
                <thead>
                  <tr className="inicioTabla">
                    <th scope="col">Producto</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Eliminar</th>
                  </tr>
                </thead>
                <tbody>


                  {prodCarrito.map((prodCarrito) => (
                    <ItemCarrito prodCarrito={prodCarrito} />
                  ))}


                </tbody>
              </table>

             
                <button className="btn btn-primary btn-block botonElegirFormaPago" onClick={getCheckout}>Elegir forma de envio</button>
              


            </div>
          ) : (
            <div className="text-center noCompras">No se ha agregado ningun producto al carrito</div>
          )}
        </div>

      </div>

    </div>
  );
}