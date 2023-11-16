import "./perfil.css";
import { Link, useNavigate } from "react-router-dom";
import RUTA from "../../../routes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

type InputsFormulario = {
  password: string,
  newPassword: string
};


interface Passwords {

  password: string;
  newPassword: string;
}

export const CambiarContrasenia = () => {

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = useForm<InputsFormulario>({
    mode: "onChange",
  });

  const [modificado, setModificado] = useState<string>();
  const [errorContraseña, setErrorContraseña] = useState<string>();

  //const password = watch("password");

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data, event) => {

    console.log(data);

    const passwords: Passwords = {
      password: data.password,
      newPassword: data.newPassword
    };

    // console.log(usuario);

    const config: any = {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    };
    const URL: string = "http://localhost:8080/sensor/api/users/modify-password";


    axios
      .put(URL, passwords, config)
      .then((res) => {
        setErrorContraseña("");
        setModificado("Se han modificado la contraseña correctamente");
        event?.target.reset();

        navigate(RUTA.CONFIRMAR_CAMBIAR_CONTRASENIA);
      })
      .catch((err) => {
        
          console.log(err.response.data);
          console.log(err.response.data.error.message);
          //setErrorContraseña("ERROR");
          setModificado("");
        setErrorContraseña(err.response.data.error.message);
      });
  });


  return (

    <div className="editarPerfil">
      <form
        className="formEditarPerfil"
        id="contact-form"
        name="contact-form"
        onSubmit={onSubmit}
      >

        <div className="row">

          <div className="col-md-12">
            <label className="labelEditarPerfil">Vieja contraseña:</label>
            <input
              type="password"
              className={`${"form-control"} ${errors.password && "cuadroError"
                }`}
              //className="form-control"
              placeholder="Vieja contraseña"
              {...register("password", {
                required: {
                  value: true,
                  message: "Ingrese una contraseña",
                },
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
            />

            {errors.password && (
              <span className={errors.password && "mensajeError"}>
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <label className="labelEditarPerfil">Nueva contraseña:</label>
            <input
              type="password"
              className={`${"form-control"} ${errors.newPassword && "cuadroError"
                }`}
              //className="form-control"
              placeholder="Nueva contraseña"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "Ingrese una nueva contraseña",
                },
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
            />

            {errors.newPassword && (
              <span className={errors.newPassword && "mensajeError"}>
                {errors.newPassword.message}
              </span>
            )}
          </div>
        </div>

        {modificado && (
            <div className="alert alert-primary">
              {modificado}
            </div>
          ) && (
              <div className="alert alert-danger">{errorContraseña}</div>
            )}

        <div className="text-center text-md-left botonEditarPerfil">
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Modificar
          </button>
        </div>
        <div className="status"></div>
      </form>
    </div>
  );
};
