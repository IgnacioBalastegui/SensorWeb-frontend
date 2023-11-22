import sensor from "../../../Images/sensor.jpg";
import "../carrito.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


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
  imageBase64?: string;
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

interface Props {
  prodCarrito: cartProducts;
}

interface Cantidad {
  quantity: number;
}

export const ItemCarrito = ({ prodCarrito }: Props) => {

  // let cantidadProducto: number = prodCarrito.quantity;

  const agregarCarrito = () => {

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

      const cantidad: Cantidad = {
        quantity: 1
      };

      const URL: string =
        "http://proyecto-backend-web-production.up.railway.app/sensor/api/carts/products/" + prodCarrito.product.id;

      axios
        .post(URL, cantidad, config)
        .then((res) => {
          console.log("agregado al carrito")
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err.response.data);
          console.log(err.response.data.error.message);
        });
    }

  };

  const quitarCarrito = () => {

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

      /*const cantidad: Cantidad = {
        quantity: 1
      };*/

      const URL: string =
        "http://localhost:8080/sensor/api/carts/products/" + prodCarrito.product.id;

      axios
        .delete(URL, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          }, data: { quantity: 1 }
        })
        .then((res) => {
          console.log("quitado del carrito")
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err.response.data);
          console.log(err.response.data.error.message);
        });
    }

  };

  const eliminarCarrito = () => {

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

      /*const cantidad: Cantidad = {
        quantity: 1
      };*/

      const URL: string =
        "http://localhost:8080/sensor/api/carts/products/" + prodCarrito.product.id;

      axios
        .delete(URL, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          }, data: { quantity: prodCarrito.quantity }
        })
        .then((res) => {
          console.log("eliminado del carrito")
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err.response.data);
          console.log(err.response.data.error.message);
        });
    }

  };


  let total = 0;
  if (prodCarrito.product.price != null && prodCarrito.quantity != null) {

    total = prodCarrito.product.price * prodCarrito.quantity;

    window.localStorage.removeItem("total");
    localStorage.setItem("total", total.toString());
  } else {
    total = 0;
  }

  return (
    <tr className="tablaContenido">
      <td scope="row">
        <img src={prodCarrito.product.imageBase64} alt="producto" className="historialImagen" />
      </td>
      <td>
        <p className="datosTabla">{prodCarrito.product.name}</p>
      </td>
      <td>
        <p className="datosTabla">${prodCarrito.product.price}</p>
      </td>

      <td>
        <div className="row seccionCantidad">
          <button className="btn btn-primary botonMasMenos" onClick={agregarCarrito}>+</button>
          <p className="datosTabla">{prodCarrito.quantity}</p>
          <button className="btn btn-primary botonMasMenos" onClick={quitarCarrito}>-</button>
        </div>

        <strong>Precio total: {total}</strong>
      </td>

      <td>
        <button className="btn btn-primary botonEliminar" onClick={eliminarCarrito}>
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>

  );
}