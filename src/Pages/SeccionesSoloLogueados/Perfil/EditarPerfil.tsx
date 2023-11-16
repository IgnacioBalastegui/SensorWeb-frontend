import "./perfil.css";
import { Link, useNavigate } from "react-router-dom";
import RUTA from "../../../routes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Datepicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";


type InputsFormulario = {
  nombre: string;
  apellido: string;
  email: string;
  nacionalidad: string;
  //fechaNacimiento: Date;
  fechaNacimiento: string;
};

interface Usuario {
  name: string;
  lastname: string;
  email: string;
  password: string;
  country: string;
  dateOfBirth: string;
}

interface Usu {
  name: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  country: string | undefined;
  dateOfBirth: string;
}

export const EditarPerfil = () => {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState<Usuario>();
  const [date, setDate] = useState(new Date());

  const [cargando, setCargando] = useState<boolean>();

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

      const URL: string = "http://localhost:8080/sensor/api/users";

      axios.get(URL, config).then((res) => {
        setPerfil(res.data)

        const año = new Date(res.data.datesBirth);
        setDate(año)
      })
        .catch((err) => {
          console.log(err.response.data);
          console.log(err.response.data.error.message);
        });
    }
  };

  const hoy = new Date();

  const onChange = (fecha: Date) => {
    setDate(fecha);
    register("fechaNacimiento", {
      validate: (value) => {
        if (fecha > hoy) {
          return ("Cambie la fecha a una valida")
        } else if (fecha == null) {
          return ("Ingrese una fecha")
        }
      }
    })
  }

  useEffect(() => {
    getData();
  }, []);

  registerLocale("es", es);

  const [modificado, setModificado] = useState<string>();
  const [errorPerfil, setErrorPerfil] = useState<string>();

  const onSubmit = handleSubmit((data, event) => {

    // console.log(data);
    setCargando(true)
    let calcMes = date.getMonth() + 1;
    let mes = calcMes.toString()

    let dia = date.getDate().toString();

    if (date.getDate() <= 9 && calcMes <= 9) {
      dia = "0" + date.getDate()
      mes = "0" + calcMes;
    } else if (calcMes <= 9) {
      mes = "0" + calcMes;
    } else if (date.getDate() <= 9) {
      dia = "0" + date.getDate()
    }


    const fecha = date.getFullYear() + "/" + mes + "/" + dia;

    let nombreUsu: string | undefined = data.nombre;
    let apellidoUsu: string | undefined = data.apellido;
    let emailUsu: string | undefined = data.email;
    let nacionalidadUsu: string | undefined = data.nacionalidad;

    if (nombreUsu == "") {
      nombreUsu = perfil?.name
    }
    if (apellidoUsu == "") {
      apellidoUsu = perfil?.lastname
    }
    if (emailUsu == "") {
      emailUsu = perfil?.email
    }
    if (nacionalidadUsu == "") {
      nacionalidadUsu = perfil?.country
    }

    const usuario: Usu = {
      name: nombreUsu,
      lastname: apellidoUsu,
      email: emailUsu,
      country: nacionalidadUsu,
      dateOfBirth: fecha,
    };



    const config: any = {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    };

    const URL: string = "http://localhost:8080/sensor/api/users/modify-data";
    // console.log(usuario);
    axios
      .put(URL, usuario, config)
      .then((res) => {
        setErrorPerfil("");
        setModificado("Se han modificado los datos correctamente");
        event?.target.reset();

        if (perfil?.email != emailUsu) {
          window.localStorage.removeItem("NuevoMail");
          localStorage.setItem("NuevoMail", data.email);

          navigate(RUTA.CONFIRMAR_CAMBIAR_MAIL)
        } else {
          navigate(RUTA.PERFIL);
        }
        setCargando(false)
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.data.error.message);
        setModificado("");
        setErrorPerfil(err.response.data.error.message);

        setCargando(false)
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
          <div className="col-md-6">
            <label className="labelEditarPerfil">Nombre:</label>
            <input
              type="text"
              className={`${"form-control"} ${errors.nombre && "cuadroError"
                }`}
              placeholder="Nombre"
              defaultValue={perfil?.name}
              {...register("nombre", {
                required: {
                  value: false,
                  message: "El nombre no debe estar vacío",
                },
              })}
            />

            {errors.nombre && (
              <span className={errors.nombre && "mensajeError"}>
                {errors.nombre.message}
              </span>
            )}
          </div>

          <div className="col-md-6">
            <label className="labelEditarPerfil">Apellido:</label>
            <input
              type="text"
              className={`${"form-control"} ${errors.apellido && "cuadroError"
                }`}
              placeholder="Apellido"
              defaultValue={perfil?.lastname}
              {...register("apellido", {
                required: {
                  value: false,
                  message: "El apellido no debe estar vacío",
                },
              })}
            />

            {errors.apellido && (
              <span className={errors.apellido && "mensajeError"}>
                {errors.apellido.message}
              </span>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <label className="labelEditarPerfil">Mail:</label>
            <input
              type="text"
              className={`${"form-control"} ${errors.email && "cuadroError"
                }`}
              placeholder="Email"
              defaultValue={perfil?.email}
              {...register("email", {
                required: {
                  value: false,
                  message: "El mail no debe estar vacío",
                },
              })}
            />

            {errors.email && (
              <span className={errors.email && "mensajeError"}>
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <label className="labelEditarPerfil">Nacionalidad:</label>
            <input
              type="text"
              className={`${"form-control"} ${errors.nacionalidad && "cuadroError"
                }`}
              placeholder="Nacionalidad"
              defaultValue={perfil?.country}
              {...register("nacionalidad", {
                required: {
                  value: false,
                  message: "La nacionalidad no debe estar vacío",
                },
              })}
            />

            {errors.nacionalidad && (
              <span className={errors.nacionalidad && "mensajeError"}>
                {errors.nacionalidad.message}
              </span>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <label className="labelEditarPerfil">Fecha de Nacimiento:</label>
            <div  /*className="pruebaCalen"*/>
              <Datepicker selected={date} onChange={onChange} locale="es" dateFormat="yyyy/MM/dd"
                className={`${"form-control pickerPerfil"} ${errors.fechaNacimiento && "cuadroError"}`}
                isClearable
                placeholderText="Seleccione una fecha"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" />
            </div>

            {errors.fechaNacimiento && (
              <span className={errors.fechaNacimiento && "mensajeError"}>
                {errors.fechaNacimiento.message}
              </span>
            )}
          </div>
        </div>

        <div className="text-center text-md-left botonEditarPerfil">
          <button type="submit" className="btn btn-primary mb-4 botonEditarPerfil" disabled={cargando ? true : false}>
            {cargando ? "Cargando..." : "Modificar"}
          </button>
        </div>
        <div className="status"></div>
      </form>
    </div>
  );
};
