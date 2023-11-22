import sensor from "../../../Images/sensor.jpg";
import "../favoritos.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Product {
  id?: number;
  imageBase64?: string;
  name?: string;
  // quantity?: number;
  price?: number;
}

interface IFavoritos {
  product: Product;

}

interface Props {
  favorito: IFavoritos;
}


export const ItemFavoritos = ({ favorito }: Props) => {


  // const { idProducto } = useParams();

  const deleteFavoritos = () => {

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
        "http://proyecto-backend-web-production.up.railway.app/sensor/api/favorites/products/" + favorito.product.id;

      axios.delete(URL, config).then((res) => {

        /* console.log("DATOS: "+res.data);
         setFavorito(res.data);*/
        console.log("producto eliminado")
      }).catch(err => {
        console.log("ERROR: " + err)
      });
    } /*else {
      navigate(RUTA.LOGIN);
    }*/
  };




  return (
    <tr className="tablaContenido">
      <td scope="row">
        <img src={favorito.product.imageBase64} alt="producto" className="historialImagen" />
      </td>
      <td>
        <p className="datosTabla">{favorito.product.name}</p>
      </td>
      <td>
        <p className="datosTabla datosTabla2">${favorito.product.price}</p>
      </td>
      <td>
        <button className="btn btn-primary botonEliminar" onClick={deleteFavoritos}>
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}