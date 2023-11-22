import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./contacto.css";

interface IFormularioContacto {
  name: string;
  lastname: string;
  email: string;
  reasonForContact: string;
  message: string;
}

export const Contacto = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormularioContacto>({
    mode: "onChange",
  });

  const agregarMensajeContacto = handleSubmit((data, event) => {
    event?.preventDefault();
    const URL = "http://proyecto-backend-web-production.up.railway.app/sensor/api/contact-messages";

    const contacto: IFormularioContacto = {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      reasonForContact: data.reasonForContact,
      message: data.message,
    };

    axios
      .post(URL, contacto)
      .then((response) => {
        console.log(response);
        setSuccess("Se creo el comentario correctamente");
        setError("");
        event?.target.reset();
      })
      .catch((error) => {
        success && setSuccess("");
        console.log(error.response.data);
        console.log(error.response.data.error.message);
        setError(error.response.data.error.message);
      });
  });

  return (
    <div className="contacto">
      <h3 className="h1-responsive font-weight-bold text-center my-4 title">
        Contactanos
      </h3>

      <p className="text-center w-responsive mx-auto mb-5">
        ¿Tenes preguntas? No dudes en contactarnos directamente. Nuestro equipo
        te respondera en poco tiempo para ayudarte.
      </p>

      <div className="row mx-0">
        <div className="col-md-9 mb-md-0 mb-5">
          {!!error && <div className=" alert alert-danger">{error}</div>}
          {!!success && <div className=" alert alert-success">{success}</div>}
          <form
          className="formContacto"
            id="contact-form"
            name="contact-form"
            onSubmit={agregarMensajeContacto}
          >
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className={`${"form-control"} ${
                    errors.name && "cuadroError"
                  }`}
                  placeholder="Nombre"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Ingrese su nombre",
                    },
                  })}
                />

                {errors.name && (
                  <span className={errors.name && "mensajeError"}>
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className={`${"form-control"} ${
                    errors.lastname && "cuadroError"
                  }`}
                  placeholder="Apellido"
                  {...register("lastname", {
                    required: {
                      value: true,
                      message: "Ingrese su apellido",
                    },
                  })}
                />

                {errors.lastname && (
                  <span className={errors.lastname && "mensajeError"}>
                    {errors.lastname.message}
                  </span>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <input
                  type="text"
                  className={`${"form-control"} ${
                    errors.email && "cuadroError"
                  }`}
                  placeholder="Email"
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
            </div>

            <div className="row">
              <div className="col-md-12">
                <input
                  type="text"
                  className={`${"form-control"} ${
                    errors.reasonForContact && "cuadroError"
                  }`}
                  placeholder="Tema"
                  {...register("reasonForContact", {
                    required: {
                      value: true,
                      message: "Ingrese su tema",
                    },
                  })}
                />

                {errors.reasonForContact && (
                  <span className={errors.reasonForContact && "mensajeError"}>
                    {errors.reasonForContact.message}
                  </span>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="md-form">
                  <textarea
                    placeholder="Mensaje"
                    className={`${"form-control md-textarea"} ${
                      errors.message && "cuadroError"
                    }`}
                    {...register("message", {
                      required: {
                        value: true,
                        message: "Ingrese su mensaje",
                      },
                    })}
                  />

                  {errors.message && (
                    <span className={errors.message && "mensajeError"}>
                      {errors.message.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center text-md-left botonEnvio">
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Enviar
              </button>
            </div>
            <div className="status"></div>
          </form>
        </div>

        <div className="col-md-3 text-center iconos">
          <ul className="list-unstyled mb-0">
            <li>
              <i className="fas fa-map-marker-alt fa-2x"></i>
              <p>Calle falsa 123</p>
            </li>

            <li>
              <i className="fas fa-phone mt-4 fa-2x"></i>
              <p>+54 11 2233 4455</p>
            </li>

            <li>
              <i className="fas fa-envelope mt-4 fa-2x"></i>
              <p>empresa@gmail.com</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
