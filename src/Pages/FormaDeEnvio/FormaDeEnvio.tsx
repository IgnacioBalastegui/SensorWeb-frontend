import './formaDeEnvio.css';
import { Link, useNavigate } from "react-router-dom";
import RUTA from "../../routes";
import { BotonSwitch } from '../../Components/BotonSwitch/BotonSwitch';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from 'react-hook-form';


type InputsFormularioDireccion = {
    calle: string;
    calleNumero: number;
};

interface DatosDireccion {
    calle: string;
    calleNumero: number;
}


interface IBodyNextStep {

    shippingMethodAndAddress: {};

    paymentMethod: any;
}

interface MetodoEnvio {

    shippingMethod: string | undefined;

}

export const FormaDeEnvio = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputsFormularioDireccion>({
        mode: "onChange",
    });

    const [isToggled, setIsToggled] = useState(false);

    const [isADomicilio, setIsADomicilio] = useState(false);
    const [isPorCorreo, setIsPorCorreo] = useState(false);
    const [isEnLocal, setIsEnLocal] = useState(false);

    const [errorDireccion, setErrorDireccion] = useState<string>();

    const [metodoEnvio, setMetodoEnvio] = useState<string>();

    const handleOnChange = (): void => {
        setIsToggled(!isToggled)
    };

    const handleOnChange1 = (): void => {
        setIsADomicilio(!isADomicilio)
        setIsPorCorreo(false)
        setIsEnLocal(false)

        setMetodoEnvio("A domicilio")
        //console.log(metodoEnvio)
    };



    const handleOnChange3 = (): void => {
        setIsEnLocal(!isEnLocal)
        setIsPorCorreo(false)
        setIsADomicilio(false)


        setMetodoEnvio("Retiro en local")
        //console.log(metodoEnvio)
    };

    const navigate = useNavigate();

    const onSubmit = handleSubmit((data, event) => {
       // console.log(data);

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
            //const email = values.email;

            const URL: string =
                "http://proyecto-backend-web-production.up.railway.app/sensor/api/carts/next-step";

            const body: IBodyNextStep = {
                shippingMethodAndAddress:
                {
                    shippingMethod: metodoEnvio,

                    addresses: [{
                        street: data.calle,
                        streetNumber: data.calleNumero,
                        floor: null,
                        apartmentNumber: null,
                        typeOfAddress:
                        {
                            name: "Facturacion"
                        }

                    }]

                },
                paymentMethod: null


            }

            axios.post(URL, body, config).then((res) => {

                //console.log(res.data)
                navigate(RUTA.FORMADEPAGO);

            }).catch(err => {
                console.log("ERROR: " + err)
            });
        }
    });


    const volver = () => {
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
            //const email = values.email;

            const URL: string =
                "http://proyecto-backend-web-production.up.railway.app/sensor/api/carts/cancel";

            axios.post(URL,{}, config).then((res) => {

                //console.log(res.data)
                navigate(RUTA.CARRITO);

            }).catch(err => {
                console.log("ERROR: " + err)
            });
        }
    }

    return (
        <div className="FormaDeEnvio">

            <div className="formularioDireccion">

                <div className="row align-items-center mx-0">
                    <div className="col formularioLogin">
                        {errorDireccion && <div className="alert alert-danger">{errorDireccion}</div>}

                        <h3 className="text-center mb-5 title">
                            <strong>Dirección</strong>
                        </h3>

                        <form onSubmit={onSubmit}>
                            <div className="form-outline mb-4">
                                <label className="form-label">Calle</label>

                                <input
                                    type="text"
                                    className={`${"form-control"} ${errors.calle && "cuadroError"}`}
                                    placeholder="Calle falsa"
                                    {...register("calle", {
                                        required: {
                                            value: true,
                                            message: "Ingrese el nombre de la calle",
                                        },
                                    })}
                                />

                                {errors.calle && (
                                    <span className={errors.calle && "mensajeError"}>
                                        {errors.calle.message}
                                    </span>
                                )}
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" >
                                    Numero
                                </label>

                                <input
                                    type="text"
                                    className={`${"form-control"} ${errors.calleNumero && "cuadroError"
                                        }`}
                                    placeholder="123"
                                    {...register("calleNumero", {
                                        required: {
                                            value: true,
                                            message: "Ingrese el numero de la calle",
                                        },
                                    })}
                                />

                                {errors.calleNumero && (
                                    <span className={errors.calleNumero && "mensajeError"}>
                                        {errors.calleNumero.message}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-center mb-5 title">
                                <strong>FORMA DE ENVIO</strong>
                            </h3>

                            <div className="row mx-0 filaMetodoPago">
                                <div className='prueba'>
                                    <text>Envio a domicilio</text>
                                </div>

                                <BotonSwitch isToggled={isADomicilio} onToggle={handleOnChange1} />
                            </div>
                            <div className="row mx-0 filaMetodoPago">
                                <div className='prueba'>
                                    <text>Envio por correo</text>
                                </div>

                                {/*<BotonSwitch isToggled={isPorCorreo} onToggle={() => handleOnChange2()} />
                            </div>
                            <div className="row mx-0 filaMetodoPago">
                                <div className='prueba'>
                                    <text>Retirar en local</text>
                                </div>*/}

                                <BotonSwitch isToggled={isEnLocal} onToggle={() => handleOnChange3()} />
                            </div>
                            <button
                                type="submit"
                                value="submit"
                                className="btn btn-primary btn-block mb-4"
                            >
                                Metodo de pago
                            </button>

                        </form>


                    </div>
                    <button
                        className="btn btn-primary btn-block mb-4 botonVolver"
                        onClick={volver}
                    >
                        Volver
                    </button>
                </div>
            </div>

        </div>
    );
}