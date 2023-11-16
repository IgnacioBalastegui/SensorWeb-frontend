import './formaDePago.css';
import { Link, useNavigate } from "react-router-dom";
import RUTA from "../../routes";
import { ChangeEvent, useState } from 'react';

import { TarjetaDebito } from './TarjetaDebito';
import { TarjetaCredito } from './TarjetaCredito';
import { MercadoPago } from './MercadoPago';
import axios from 'axios';


interface IBodyNextStep {

    shippingMethodAndAddress: {};

    paymentMethod: any;
}


export const FormaDePago = () => {

    const [selectedId, setSelectedId] = useState<string>();

    const [selectedPago, setSelectedPago] = useState<string>();

    const onChangeMetodoPago = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedId(e.target.value);

        if (e.target.value == "1") {
            setSelectedPago("Tarjeta de debito")
        } else if (e.target.value == "2") {
            setSelectedPago("Tarjeta de credito")
        } else if (e.target.value == "3") {
            setSelectedPago("Efectivo")
        }

        //console.log(selectedPago)
        // console.log(selectedId)
    };

    const navigate = useNavigate();


    return (
        <div className="FormaDePago">

            <div className="texto vistaFormaPago">
                <div className="col">
                    <h3>MÉTODO DE PAGO</h3>
                </div>

                {selectedId != "1" && selectedId != "2" && selectedId != "3" && <strong className="text-center">Seleccione un metodo de pago</strong>}

                <div className="row mx-0 filaMetodoPago">

                    <div className='prueba'>
                        <text>Metodo de pago:</text>
                    </div>

                    <div className="colInputMetodo">

                        <select id="selectMetodoPago" className="custom-select selectMetodoPago"
                            onChange={(e) => {
                                onChangeMetodoPago(e);
                            }}>
                            <option selected>Seleccione una opcion</option>
                            {/*<option value="1">Tarjeta de Debito o Credito</option>*/}
                            {/*<option value="2">Tarjeta de Credito</option>*/}
                            <option value="3">Mercado pago</option>
                        </select>
                    </div>
                </div>
                {selectedId != "1" && selectedId != "2" && selectedId != "3" && <div className="text-center noCompras">No se ha seleccionado ningun metodo de pago</div>}

                {/*selectedId == "1" && <TarjetaDebito />*/}
                {/*selectedId == "2" && <TarjetaCredito />*/}
                {selectedId == "3" && <MercadoPago />}


                {/*<button className="btn btn-primary mb-4 botonMetodoPago" onClick={getEstadoEntrega}>Confirmar</button>*/}
            </div>

        </div>
    );
}