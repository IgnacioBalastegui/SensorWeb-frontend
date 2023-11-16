import { Comentario } from "./Comentario/Comentario";
import { FormularioComentario } from "./FormularioComentario/FormularioComentario";
import { IComentario } from "./interface";

interface Props {
  comentarios: IComentario[];
  idProducto: number;
  getComentarios: () => void
}

export const SeccionComentario = ({ comentarios, idProducto, getComentarios }: Props) => {
  return (
    <div className="fondo-formulario pt-4 pb-3">
      <FormularioComentario idProducto={idProducto} getComentarios={getComentarios} />
      <hr />

      <div className="container pt-5 pb-4">
        <h4>Ultimos comentarios </h4>
        <br />

        {comentarios.length > 0 ? (
          comentarios.map((comentario) => (
            <Comentario key={comentario.id} comentario={comentario} />
          ))
        ) : (
          <div className="text-center noCompras">No hay comentarios</div>
        )}
      </div>
      <hr />
    </div>
  );
};
