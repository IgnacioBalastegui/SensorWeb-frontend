import "./compraRealizada.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import RUTA from "../../../routes";
import { ItemCompraRealizada } from "./ItemCompraRealizada/ItemCompraRealizada";

export const CompraRealizada = () => {
  const navigate = useNavigate();

  interface comprasRealizadasProductos {
    productId?: number;
    name?: string;
    price?: number;
    quantity?: number;
    description?: string;
    addedToCart?: Date;
    imageBase64?: string;
  }


  const [productos, setProductos] = useState<comprasRealizadasProductos[]>([]);
  
  const getComprasRealizadas = () => {
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
        "https://proyecto-backend-web-production.up.railway.app/sensor/api/sale-orders/user?state=ENTREGAR_PRODUCTOS";

      axios.get(URL, config).then((res) => {
        setProductos(res.data[0].products);

       /* console.log("DATOS:");
        console.log(res.data);
        console.log("PRODUCTOS:");
        console.log(res.data.products);*/
      }).catch(err => {
        console.log(err)
      });
    } else {
      //navigate(RUTA.LOGIN);
    }
  };

  useEffect(() => {
    getComprasRealizadas();
  }, []);



  return (
    <div className="CompraRealizada">
      <h3 className="text-center mb-5 title">
        <strong>Compras Realizadas</strong>
      </h3>
      {productos.length > 0 ? (
        <div className="row margen">
          <table className="table">
            <thead>
              <tr className="inicioTabla">
                <th scope="col">Nombre</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((compra) => (
                <ItemCompraRealizada key={compra.productId} compra={compra} />
              ))}
            </tbody>
          </table>


        </div>
      ) : (
        <div className="text-center noCompras">No hay compras realizadas</div>
      )}
    </div>
  );
};
