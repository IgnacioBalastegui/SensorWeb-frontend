import "./favoritos.css";
import sensor from "../../Images/sensor.jpg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RUTA from "../../routes";
import { useEffect, useState } from "react";

import { ItemFavoritos } from "./ItemFavoritos/ItemFavoritos";

export const Favoritos = () => {

  const navigate = useNavigate();

  interface Product{
    id?: number;
    // image?: string;
     name?: string;
    // quantity?: number;
     price?:number;
}

interface IFavoritos {
product: Product;

}

  const [favorito, setFavorito] = useState<IFavoritos[]>([]);

  const getFavoritos = () => {

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
        "https://proyecto-backend-web-production.up.railway.app/sensor/api/favorites/all";

      axios.get(URL, config).then((res) => {

        console.log("DATOS: "+res.data);

        setFavorito(res.data);
      }).catch(err => {
        console.log("ERROR: "+err)
      });
    } else {
     // navigate(RUTA.LOGIN);
    }
  };

  
  useEffect(() => {
    getFavoritos();
  }, [favorito]);

  return (
    <div className="Favoritos">
      <h3 className="text-center mb-5 title">
        <strong>Lista de favoritos</strong>
      </h3>
      {favorito.length > 0 ? (
        <div className="row margen">
          <table className="table">
            <thead>
              <tr className="inicioTabla">
                <th scope="col">Producto</th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>


              {favorito.map((favorito) => (
                <ItemFavoritos favorito={favorito} />
              ))}


            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center noCompras">No se ha marcado ningun producto como favorito</div>
      )}
    </div>
  );
}