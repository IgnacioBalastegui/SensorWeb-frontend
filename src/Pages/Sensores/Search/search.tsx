import React, { useEffect, useState } from "react";
import "./Search.css";

import { IProducto } from "../interface";
import axios from "axios";
import { Sensor } from "../Sensor/Sensor";

const Search: React.FC = () => {

  const [productos, setProductos] = useState<IProducto[] | undefined>([]);

  const [allProductos, setAllProductos] = useState<IProducto[]>([]);

  const getProductos = () => {
    axios.get("http://localhost:8080/sensor/api/products/all").then((res) => {
      setProductos(res.data);

      setAllProductos(res.data);
    });
  };


  useEffect(() => {
    getProductos();
  }, []);


  const [text, setText] = useState<string>("");

  const handleOnClick = () => {
    const findProducts = productos && productos?.length > 0 ? productos?.filter((prod) => prod?.name === text) : undefined;

    console.log(findProducts);

    setProductos(findProducts)
  };

  return (
    <div>
      <div className="input__wrapper">
        <input
          type="text"
          placeholder="Escribe aqui"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setProductos(allProductos);
          }}
        />
        <button disabled={!text} onClick={handleOnClick}>
          Buscar
        </button>
        <h3 className="title">
          <strong>Lista de productos</strong>
        </h3>
      </div>

      <div className="body">
        {productos && productos?.length === 0 && (
          <div className="notFound">sensor no disponible</div>
        )}

        <div className="products-container">
          {productos && productos?.length > 0 && productos?.map((sensor) => (
            <Sensor key={sensor.id} product={sensor} />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Search;
