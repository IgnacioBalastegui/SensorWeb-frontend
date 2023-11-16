import axios from 'axios';
import './formaDePago.css';
import { useNavigate } from 'react-router-dom';
import RUTA from '../../routes';
import { useForm } from 'react-hook-form';

interface IBodyNextStep {

    shippingMethodAndAddress: {};

    paymentMethod: {};
}

type InputsFormulario = {
    numeroTarjeta: string;
    nombreApellido: string;
    fechaVigencia: string;
    codigoSeguridad: string;
};

export const TarjetaDebito = () => {

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

    const navigate = useNavigate();

    const pagarTotal: string = JSON.stringify(localStorage.getItem("total"));

    /*const getEstadoEntrega = () => {

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
                "http://localhost:8080/sensor/api/carts/next-step";

            const mailComprador: string = JSON.stringify(localStorage.getItem("mail"));

            const body: IBodyNextStep = {
                shippingMethodAndAddress:
                {
                    shippingMethod: null,

                    addresses: null
                },
                paymentMethod:
                {
                    token: "TEST-410f3611-466c-438b-97ee-5b3a122579b9", //debe ser el token de mercado pago ej: token("9b2d63e00d66a8c721607214cedaecda") //TEST-410f3611-466c-438b-97ee-5b3a122579b9
                    issuer_id: 1, //id del comprador ej: id("3245612")
                    payment_method_id: "debit_card", //se refiere a: paymentMethodId("debit_card")____ buscar el id referente
                    transaction_amount: pagarTotal,
                    installments: 1, // ni idea, lo unico q encontre:  .installments(1)
                    description: "algo", //ni idea

                    payer: {
                        email: mailComprador,
                        identification:
                        {
                            type: "customer", //referente a: .type("customer")
                            number: 1  // ni idea
                        }
                    }
                }
            }

            axios.post(URL, body, config).then((res) => {
                console.log(res.data)

                navigate(RUTA.COMPRAS_REALIZADAS);
            }).catch(err => {
                console.log("ERROR: " + err)
            });
        }
    };*/

// ------------------------------------------------------------------------------------------------------------
    const onSubmit = handleSubmit((data, event)=>{
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
                "http://localhost:8080/sensor/api/carts/next-step";

            const mailComprador: string = JSON.stringify(localStorage.getItem("mail"));

            const body: IBodyNextStep = {
                shippingMethodAndAddress:
                {
                    shippingMethod: null,

                    addresses: null
                },
                paymentMethod:
                {
                    informationCard: {
                        token: "TEST-410f3611-466c-438b-97ee-5b3a122579b9", //debe ser el token de mercado pago ej: token("9b2d63e00d66a8c721607214cedaecda") //TEST-410f3611-466c-438b-97ee-5b3a122579b9
                        issuer_id: 1, //id del comprador ej: id("3245612") //1449702523
                        payment_method_id: "debit_card", //se refiere a: paymentMethodId("debit_card")____ buscar el id referente
                        transaction_amount: 25000,
                        installments: 1, // ni idea, lo unico q encontre:  .installments(1)
                        description: "algo", //ni idea
    
                        payer: {
                            email: mailComprador,
                            identification:
                            {
                                type: "DNI", //referente a: .type("customer")
                                number: 12345678  // ni idea
                            }
                        }
                    },
                   
                }
            }

            axios.post(URL, body, config).then((res) => {
                console.log(res.data)

                navigate(RUTA.COMPRAS_REALIZADAS);
            }).catch(err => {
                console.log("ERROR: " + err)
            });
        }

    });
// ------------------------------------------------------------------------------------------------------------

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

            const URL: string = "http://localhost:8080/sensor/api/carts/cancel";

            axios.post(URL,{}, config).then((res) => {
                console.log(res.data)
                navigate(RUTA.CARRITO);
            }).catch(err => {
                console.log("ERROR: " + err)
                console.log(err.response.data.error.message);
                
            });
        }
    }

    return (

        <div>
            <div className="FormaDePagoTarjeta">

                <h3>Tarjeta de debito o Credito</h3>

                <div className="texto vistaFormaPago">

                    <form // HABILITAR CUANDO SE ARREGLE EL ENDPOINT
                    onSubmit={onSubmit}>

                        <strong>Total a pagar: ${pagarTotal}</strong>

                        <div className="row mx-0 filaMetodoPago">
                            <div className='prueba'>

                                <label>Numero de tarjeta:</label>
                                <input
                                    type="text"
                                    className="form-control elegirMetodo"
                                    placeholder="1234 1234 1234 1234"
                                    {...register("numeroTarjeta", {
                                        required: {
                                            value: false, //cambiar
                                            message: "Ingrese el numero de tarjeta",
                                        },
                                    })} />
                            </div>
                        </div>

                        <div className="row mx-0 filaMetodoPago">
                            <div className='prueba'>

                                <label>Nombre y apellido del titular:</label>
                                <input
                                    type="text"
                                    className="form-control elegirMetodo"
                                    placeholder="Nombre y apellido"
                                    {...register("nombreApellido", {
                                        required: {
                                            value: false, //cambiar
                                            message: "Ingrese nombre y apellido del titular",
                                        },
                                    })} />

                            </div>
                        </div>

                        <div className="row mx-0 filaMetodoPago">
                            <div className='prueba'>

                                <label>Fecha de vigencia:</label>
                                <input
                                    type="text"
                                    className="form-control elegirMetodo"
                                    placeholder="DD/MM/AAAA"
                                    {...register("fechaVigencia", {
                                        required: {
                                            value: false, //cambiar
                                            message: "Ingrese la fecha de vigencia de la tarjeta",
                                        },
                                    })} />
                            </div>
                        </div>

                        <div className="row mx-0 filaMetodoPago">
                            <div className='prueba'>

                                <label>Codigo de seguridad:</label>
                                <input
                                    type="text"
                                    className="form-control elegirMetodo"
                                    placeholder="123"
                                    {...register("codigoSeguridad", {
                                        required: {
                                            value: false, //cambiar
                                            message: "Ingrese el codigo de seguridad",
                                        },
                                    })} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            value="submit"
                            className="btn btn-primary"
                        >
                            Pagar
                        </button>
                    </form>

                </div>


            </div>
            <div className="botonVolver">
                <button
                    className="btn btn-primary "
                    onClick={volver}
                >
                    Volver
                </button>
            </div>
        </div>
    );
}