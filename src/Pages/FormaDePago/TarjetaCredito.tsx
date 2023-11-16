import './formaDePago.css';

export const TarjetaCredito = () => {

    return (
        <div className="FormaDePago">

            <h3>Tarjeta de credito</h3>

            <div className="texto vistaFormaPago">

                <div className="row mx-0 filaMetodoPago">
                    <div className='prueba'>
                        <text>Numero de tarjeta:</text>
                    </div>

                    <div className="colInputMetodo">
                        <input
                            type="text"
                            className="form-control elegirMetodo"
                            placeholder="Numero de tarjeta" />
                    </div>
                </div>

                <div className="row mx-0 filaMetodoPago">
                    <div className='prueba'>
                        <text>Nombre y apellido del titular:</text>
                    </div>

                    <div className="colInputMetodo">
                        <input
                            type="text"
                            className="form-control elegirMetodo"
                            placeholder="Nombre y apellido" />
                    </div>
                </div>

                <div className="row mx-0 filaMetodoPago">
                    <div className='prueba'>
                        <text>Fecha de vigencia:</text>
                    </div>

                    <div className="colInputMetodo">
                        <input
                            type="text"
                            className="form-control elegirMetodo"
                            placeholder="Fecha" />
                    </div>
                </div>

                <div className="row mx-0 filaMetodoPago">
                    <div className='prueba'>
                        <text>Codigo de seguridad:</text>
                    </div>

                    <div className="colInputMetodo">
                        <input
                            type="text"
                            className="form-control elegirMetodo"
                            placeholder="Codigo" />
                    </div>
                </div>
            </div>



        </div>
    );
}