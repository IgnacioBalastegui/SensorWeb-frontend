import { useState } from "react";
import "./login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RUTA from "../../routes";

type InputsFormularioLogin = {
  email: string;
  password: string;
};

interface UsuarioLogin {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsFormularioLogin>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const [errorLogin, setErrorLogin] = useState<string>();

  const iniciarSesion = (token: string): void => {
    window.localStorage.removeItem("token");
    navigate(RUTA.PERFIL);
    localStorage.setItem("token", token);
  };

  const onSubmit = handleSubmit((data, event) => {
    //console.log(data);
    const usuario: UsuarioLogin = {
      email: data.email,
      password: data.password,
    };

    window.localStorage.removeItem("mail");
    localStorage.setItem("mail", data.email);

    axios
      //.post("http://localhost:8080/sensor/api/auth/login", usuario)
      .post("http://proyecto-backend-web-production.up.railway.app/sensor/api/auth/login", usuario)
      .then((res) => {
        setErrorLogin("");
       /* console.log("data: "+res.data);
        console.log("token: "+res.data.token);*/
        const token: string = res.data.token;
        iniciarSesion(token);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.data.error.message);
        setErrorLogin(err.response.data.error.message);
      });
  });

  return (
    <div className="Login">
      <div className="row align-items-center mx-0">
        <div className="col formularioLogin">
          {errorLogin && <div className="alert alert-danger">{errorLogin}</div>}

          <h3 className="text-center mb-5 title">
            <strong>Iniciar sesión</strong>
          </h3>

          <form onSubmit={onSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label">Email</label>

              <input
                type="text"
                className={`${"form-control"} ${errors.email && "cuadroError"}`}
                placeholder="tu email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Ingrese su email",
                  },
                })}
              />

              {errors.email && (
                <span className={errors.email && "mensajeError"}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" id="password">
                Contraseña
              </label>

              <input
                type="password"
                className={`${"form-control"} ${
                  errors.password && "cuadroError"
                }`}
                placeholder="tu contraseña"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Ingrese su contraseña",
                  },
                })}
              />

              {errors.password && (
                <span className={errors.password && "mensajeError"}>
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="row mb-4 irARegistro">
              <div className="col d-flex justify-content-center">
                <div className="form-check">
                  <p>
                    ¿No esta registrado?{" "}
                    <Link to={RUTA.REGISTRO}>Registrarse</Link>
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              value="submit"
              className="btn btn-primary btn-block mb-4"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
