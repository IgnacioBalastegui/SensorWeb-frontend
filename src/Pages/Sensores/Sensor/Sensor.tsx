import { IProducto } from "../interface";
import { Link } from "react-router-dom";
import RUTA from "../../../routes";
import "./styles.css"

interface Props {
  product: IProducto;
}

export const Sensor = ({ product }: Props) => {

  return (
    <Link to={RUTA.SENSOR.RUTA_SIN_PARAMETROS + "/" + product.id}>
      <div className="product">
        <img src={product.imageBase64} alt={product.descripcion} className="img" />
        <h3>{product.name}</h3>
        <div className="price">${product.price}</div>
      </div>
    </Link>
  );
};
