import "./perfil.css";
import { Link, useNavigate } from "react-router-dom";
import RUTA from "../../../routes";
import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number,
  name: string,
  lastname: string,
  country: string,
  dateOfBirth: string,
  email: string,
}

export const Perfil = () => {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState<User>();
  const [fecha, setFecha] = useState<string>();

  const getData = () => {
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

      const URL: string = "https://proyecto-backend-web-production.up.railway.app/sensor/api/users";

      axios.get(URL, config).then((res) => {
        setPerfil(res.data)

        window.localStorage.removeItem("mail");
        window.localStorage.setItem("mail", res.data.email);

        const año = res.data.datesBirth;
        //año: 1999-11-20T03:00:00.000+00:00

        let fecha = año.substring(0, 10);
        setFecha(fecha)

      });
    } else {
      navigate(RUTA.LOGIN);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h3 className="title">
        <strong>{perfil?.name}</strong>
      </h3>
      <div className="datosPerfilContainer">
        <div className="row align-items-center mx-0">
          <div className="col">
            {/*<div>
            <h6 className="perfilDato">Nombre:</h6>
            <h6 className="perfilDato2">{perfil?.name}</h6>
            </div>*/}
            <div>
              <h6 className="perfilDato">Apellido:</h6>
              <h6 className="perfilDato2">{perfil?.lastname}</h6>
            </div>

            <div>
              <h6 className="perfilDato">Email:</h6>
              <h6 className="perfilDato2">{perfil?.email}</h6>
            </div>
          </div>

          <div className="col">
            <div>
              <h6 className="perfilDato">Fecha de nacimiento:</h6>
              <h6 className="perfilDato2">{fecha}</h6>
            </div>

            <div>
              <h6 className="perfilDato">Nacionalidad:</h6>
              <h6 className="perfilDato2">{perfil?.country}</h6>
            </div>
          </div>
        </div>

        <div className="opcionesPerfil">
          <Link
            className="btn btn-primary botonOpcionesPerfil"
            to={RUTA.EDITAR_PERFIL}
          >
            Editar Perfil
          </Link>

          <Link
            className="btn btn-primary botonOpcionesPerfil"
            to={RUTA.CAMBIAR_CONTRASENIA}
          >
            Cambiar Contraseña
          </Link>

          <Link className="btn btn-primary botonOpcionesPerfil"
            to={RUTA.ELIMINAR_PERFIL}
          >
            Eliminar Perfil
          </Link>
        </div>

      </div>
      <Link
        className="btn btn-primary comprasRealizadas"
        to={RUTA.COMPRAS_REALIZADAS}
      >
        Ver compras realizadas
      </Link>
    </div>
  );
};
