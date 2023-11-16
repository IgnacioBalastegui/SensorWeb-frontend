import sensor from "../../../../Images/sensor.jpg";
import "./styles.css"



interface IComprasRealizadas {
  productId?: number;
  name?: string;
  price?: number;
  quantity?: number;
  description?: string;
  addedToCart?: Date;
  imageBase64?: string;
}


interface Props {
  compra: IComprasRealizadas;
}


export const ItemCompraRealizada = ({compra}: Props) => {


  let total = 0;
  if(compra.price != null && compra.quantity != null){

    total = compra.price * compra.quantity;
  }else{
    total = 0;
  }


  
  return (
    <tr className="tablaContenido">
      <td>
        <p className="datosTabla">{compra.name}</p>
      </td>
      <td>
        <p className="datosTabla">{compra.quantity}</p>
      </td>

      <td>
        <div className="datosTabla2">
        <p className="datosTabla">${compra.price}</p>
        <strong>Precio total: {total}</strong>
        </div>
      </td>
    </tr>
  );
}
