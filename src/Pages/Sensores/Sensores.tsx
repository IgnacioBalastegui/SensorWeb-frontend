import { useEffect, useState } from "react";
import "./sensores.css";
import axios from "axios";
import { IProducto } from "./interface";
import { Sensor } from "./Sensor/Sensor";

import Search from "./Search/search";

export const Sensores = () => {
  const [productos, setProductos] = useState<IProducto[]>([]);

  const getProductos = () => {
    axios.get("http://localhost:8080/sensor/api/products/all").then((res) => {
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
      {/*<h3 className="title">
        <strong>Lista de productos</strong>
      </h3>
      <div className="products-container">
        {productos.map((product) => (
          <Sensor key={product.id} product={product} />
        ))}
        </div>*/}
    </div>
  );
};
