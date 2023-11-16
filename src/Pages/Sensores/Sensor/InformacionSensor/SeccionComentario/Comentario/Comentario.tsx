import { IComentario } from "../interface";

interface Props {
  comentario: IComentario;
}


export const Comentario = ({comentario}:Props) => {
  return (
        <p>
          <strong>De: </strong>{comentario.email} <br />
          <strong>Comentario: </strong>{comentario.comment}
        </p>
  );
}
