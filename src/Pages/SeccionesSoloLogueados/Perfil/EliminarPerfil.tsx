//import "./compraRealizada.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import RUTA from "../../../routes";

type InputConfirmarContraseña = {
  password: string;
};

interface Codigo {
  password: string;
}

export const EliminarPerfil = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputConfirmarContraseña>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const [errorEliminarPerfil, setErrorEliminarPerfil] = useState<string>();


  const onSubmit = handleSubmit((data, event) => {

    const codigo: Codigo = {
      password: data.password,
    };

    const config: any = {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    };


    axios
      .post("http://proyecto-backend-web-production.up.railway.app/sensor/api/users/delete-user", codigo, config)
      .then((res) => {
        console.log("usuario eliminado");
        event?.target.reset();
        navigate(RUTA.LOGIN);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.data.error.message);

        setErrorEliminarPerfil(err.response.data.error.message)
      });
  });

  return (
    <div className="Login">
      <div className="row align-items-center mx-0">
        <div className="col formularioLogin">
          <h3 className="text-center mb-5 title">
            <strong>Eliminar Perfil</strong>
          </h3>

          <form onSubmit={onSubmit}>
            <label>Ingresa tu contraseña </label>
            <input
              type="password"
              className="form-control"
              placeholder="Tu contraseña"
              {...register("password", {
                required: {
                  value: true,
                  message: "Ingrese una contraseña",
                },
              })}
            />
            {errors.password && (
              <span className={errors.password && "mensajeError"}>
                {errors.password.message}
              </span>
            )}
            <br />
            <br />
            {errorEliminarPerfil && (
              <div className="alert alert-danger">{errorEliminarPerfil}</div>
            )}
            <br />
            <button
              type="submit"
              value="submit"
              className="btn btn-primary btn-block mb-4"
            >
              Eliminar Perfil
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};