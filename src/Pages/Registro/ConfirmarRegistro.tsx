//import "./compraRealizada.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import RUTA from "../../routes";

type InputConfirmarCodigo = {
    codigo: string;
};

interface Codigo {
    token: string;
}
export const ConfirmarRegistro = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputConfirmarCodigo>({
        mode: "onChange",
    });

    const navigate = useNavigate();

    const [errorConfirmarRegistro, setErrorConfirmarRegistro] = useState<string>();


    const iniciarSesion = (token: string): void => {
        window.localStorage.removeItem("token");
        navigate(RUTA.PERFIL);
        localStorage.setItem("token", token);
    };


    const onSubmit = handleSubmit((data, event) => {
        //console.log(data);

        const codigo: Codigo = {
            token: data.codigo
        };

        axios
            .post("http://localhost:8080/sensor/api/auth/confirm", codigo)
            .then((res) => {
               // console.log("registrado")
                event?.target.reset();
                const token: string = res.data.token;

                iniciarSesion(token)
            })
            .catch((err) => {
                console.log(err.response.data);
                console.log(err.response.data.error.message);
                setErrorConfirmarRegistro(err.response.data.error.message)
                /*setRegistrado("");
                setErrorRegistro(err.response.data.error.message);*/
            });
    });

    return (
        <div className="Login">
            <div className="row align-items-center mx-0">
                <div className="col formularioLogin">

                    <h3 className="text-center mb-5 title">
                        <strong>Confirmar Registro</strong>
                    </h3>

                    <text>Ingrese el codigo que hemos enviado al mail <strong>{JSON.stringify(localStorage.getItem("mail"))}</strong></text>
                    <br />
                    <br />
                    <form onSubmit={onSubmit}>

                        <label>Codigo:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="aaaa-bbbb-cc11-dd22"

                            {...register("codigo", {
                                required: {
                                    value: true,
                                    message: "Ingrese un codigo",
                                },
                            })}
                        />
                        {errors.codigo && (
                            <span className={errors.codigo && "mensajeError"}>
                                {errors.codigo.message}
                            </span>
                        )}
                        <br />
                        <br />
                        {errorConfirmarRegistro && (
                            <div className="alert alert-danger">{errorConfirmarRegistro}</div>
                        )}
                        <button
                            type="submit"
                            value="submit"
                            className="btn btn-primary btn-block mb-4"
                        >
                            Verificar Codigo
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};