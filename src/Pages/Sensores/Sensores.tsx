import { useEffect, useState } from "react";
import "./sensores.css";
import axios from "axios";
import { IProducto } from "./interface";
import { Sensor } from "./Sensor/Sensor";

import Search from "./Search/search";

export const Sensores = () => {
  const [productos, setProductos] = useState<IProducto[]>([]);

  const getProductos = () => {
    axios.get("http://proyecto-backend-web-production.up.railway.app/sensor/api/products/all").then((res) => {
      setProductos(res.data);
    });
  };


  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="container">
       <div className="search">
        <Search />
      </div>
    </div>
  );
};
