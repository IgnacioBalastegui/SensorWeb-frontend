import { useEffect, useState } from "react";
import "./registro.css";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Datepicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { isEmptyStatement } from "typescript";
import RUTA from "../../routes";

//import { DatePicker } from "../../Components/Calendario/DatePicker";

type InputsFormulario = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  nacionalidad: string;
  //fechaNacimiento: Date;
  fechaNacimiento: string;
  rpassword: string;
};

interface Usuario {
  name: string;
  lastname: string;
  email: string;
  password: string;
  country: string;
  //dateBirth: Date;
  dateOfBirth: string;
}


export const Registro = () => {
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

  const [registrado, setRegistrado] = useState<string>();
  const [errorRegistro, setErrorRegistro] = useState<string>();

  const [cargando, setCargando] = useState<boolean>();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data, event) => {
    //console.log(data);
    setCargando(true);

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


    const usuario: Usuario = {
      name: data.nombre,
      lastname: data.apellido,
      email: data.email,
      password: data.password,
      country: data.nacionalidad,
      //dateOfBirth: "1999/1/20",
      dateOfBirth: fecha
    };

    //console.log("FECHA: " + fecha)
    //  console.log("date: "+fecha)
    window.localStorage.removeItem("mail");
    localStorage.setItem("mail", data.email);

    axios
      .post("https://proyecto-backend-web-production.up.railway.app/sensor/api/auth/register", usuario)
      .then((res) => {
        setErrorRegistro("");
        setRegistrado("Se ha registrado correctamente");

        setCargando(false)
        event?.target.reset();

        navigate(RUTA.CONFIRMAR_REGISTRO);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.data.error.message);
        setRegistrado("");
        setErrorRegistro(err.response.data.error.message);
        setCargando(false)
      });
  });

  const password = watch("password");
  useEffect(() => {
    trigger("rpassword");
  }, [password, trigger]);


  const [date, setDate] = useState(new Date());

  const hoy = new Date();



  const onChange = (fecha: Date) => {
    setDate(fecha);
    register("fechaNacimiento", {
      validate: (value) => {
        if (fecha > hoy) {
          return ("Ingrese una fecha valida")
        } else if (fecha == null) {
          return ("Ingrese una fecha")
        }
      }
    })
  }


  registerLocale("es", es);

  return (
    <div className="Register">
      <div className="row align-items-center mx-0">
        <div className="col formularioRegistro">

          <h3 className="text-center mb-5 title">
            <strong>Registro</strong>
          </h3>

          <form onSubmit={onSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                placeholder="tu nombre"
                className={`${"form-control"} ${errors.nombre && "cuadroError"
                  }`}
                {...register("nombre", {
                  required: {
                    value: true,
                    message: "Ingrese un nombre",
                  },
                })}
              />

              {errors.nombre && (
                <span className={"mensajeError"}>{errors.nombre.message}</span>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                placeholder="tu apellido"
                className={`${"form-control"} ${errors.apellido && "cuadroError"
                  }`}
                {...register("apellido", {
                  required: {
                    value: true,
                    message: "Ingrese su apellido",
                  },
                })}
              />
              {errors.apellido && (
                <span className={"mensajeError"}>
                  {errors.apellido.message}
                </span>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="ejemplo@gmail.com"
                className={`${"form-control"} ${errors.email && "cuadroError"}`}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Ingrese un mail",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "El formato no es correcto",
                  },
                })}
              />

              {errors.email && (
                <span className={"mensajeError"}>{errors.email.message}</span>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Nacionalidad</label>
              <input
                type="text"
                placeholder="Argentina"
                className={`${"form-control"} ${errors.nacionalidad && "cuadroError"
                  }`}
                {...register("nacionalidad", {
                  required: {
                    value: true,
                    message: "Ingrese una nacionalidad",
                  },
                })}
              />

              {errors.nacionalidad && (
                <span className={"mensajeError"}>
                  {errors.nacionalidad.message}
                </span>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Fecha de nacimiento</label>


              <div>
                <Datepicker selected={date} onChange={onChange} locale="es" dateFormat="yyyy-MM-dd"
                  className={`${"form-control picker"} ${errors.fechaNacimiento && "cuadroError"}`}
                  isClearable
                  placeholderText="Seleccione una fecha"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select" />
              </div>


              {errors.fechaNacimiento && (
                <span className={"mensajeError"}>
                  {errors.fechaNacimiento.message}
                </span>
              )}
            </div>


            <div className="form-outline mb-4">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                placeholder="tu contraseña"
                className={`${"form-control"} ${errors.password && "cuadroError"
                  }`}
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
                <span className={"mensajeError"}>
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Repetir contraseña</label>
              <input
                type="password"
                placeholder="tu contraseña nuevamente"
                className={`${"form-control"} ${errors.rpassword && "cuadroError"
                  }`}
                {...register("rpassword", {
                  validate: (value) => {
                    const { password } = getValues();
                    return (
                      password === value || "Debe coincidir con la password"
                    );
                  },
                })}
              />

              {errors.rpassword && (
                <span className={"mensajeError"}>
                  {errors.rpassword.message}
                </span>
              )}
            </div>

            {registrado && (
              <div className="alert alert-primary">{registrado}</div>
            )}
            {errorRegistro && (
              <div className="alert alert-danger">{errorRegistro}</div>
            )}
            <div className="row mb-4 irALogin">
              <div className="col d-flex justify-content-center">
                <div className="form-check">
                  <p>
                    ¿Ya esta registrado?{" "}
                    <NavLink to={"/login"}>Loguearse</NavLink>
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              value="submit"
              className="btn btn-primary btn-block mb-4"
              disabled={cargando ? true : false}
            >
              {cargando ? "Cargando..." : "Registrarse"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

