import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IComentario } from "../interface";


interface Props {
  idProducto: number;
  getComentarios: () => void;
}


interface IFormularioComentario {
  comment?: string;
}

export const FormularioComentario = ({ idProducto, getComentarios }: Props) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormularioComentario>({
    mode: "onChange",
  });

  const agregarComentario = handleSubmit((data, event) => {
    event?.preventDefault();
    //const URL = "http://localhost:8080/sensor/api/comments";
    const URL = "http://localhost:8080/sensor/api/comments/products/"+ idProducto;

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
      const email = values.email;

      const comentario: IComentario = {
        comment: data.comment,
        email,
        idProduct: idProducto,
      };

      axios
        .post(URL, comentario, config)
        .then((response) => {
          setSuccess("Se creo el comentario correctamente");
          setError("");
          event?.target.reset();
          getComentarios();
        })
        .catch((error) => {
          success && setSuccess("");
          console.log(error.response.data);
          console.log(error.response.data.error.message);
          setError(error.response.data.error.message);
        });
    } else {
      setError("Debe iniciar sesion para comentar");
    }
  });

  return (
    <div className="container">
      <h4>¡Deja tu comentario!</h4>
      {!!error && <div className=" alert alert-danger">{error}</div>}
      {!!success && <div className=" alert alert-success">{success}</div>}

      <form id="formulario" className="form02" onSubmit={agregarComentario}>
        <p>
          {" "}
          Comentario <br />
          <textarea
            placeholder="Mensaje"
            className={`${
              errors.comment && "cuadroError"
            }`}
            {...register("comment", {
              required: {
                value: true,
                message: "Ingrese su comentario",
              },
            })}
          />
          {errors.comment && (
            <span className={errors.comment && "mensajeError"}>
              {errors.comment.message}
            </span>
          )}
        </p>

        <button type="submit" className="btn btn-primary boton-formulario">
          Enviar comentario
        </button>
      </form>
    </div>
  );
};
