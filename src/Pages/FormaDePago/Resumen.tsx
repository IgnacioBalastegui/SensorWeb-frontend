import sensor from "../../Images/sensor.jpg";

export const Resumen = () => {
    return (
        <div className="Favoritos">
            <h3 className="text-center mb-5 title">
                <strong>Resumen</strong>
            </h3>

            <div className="row margen">
                <table className="table">
                    <thead>
                        <tr className="inicioTabla">
                            <th scope="col">Producto</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="tablaContenido">
                            <th scope="row">
                                {" "}
                                <img src={sensor} alt="sensor" className="historialImagen" />
                            </th>
                            <td>
                                <p className="datosTabla">SENSOR 1</p>
                            </td>
                            <td>
                                <p className="datosTabla">2</p>
                            </td>
                            <td>
                                <p className="datosTabla datosTabla2">$1000</p>
                            </td>
                        </tr>
                        <tr className="tablaContenido">
                            <th scope="row">
                                {" "}
                                <img
                                    src={sensor}
                                    alt="sensor"
                                    className="historialImagen"
                                />{" "}
                            </th>
                            <td>
                                <p className="datosTabla">SENSOR 2</p>
                            </td>
                            <td>
                                <p className="datosTabla">1</p>
                            </td>
                            <td>
                                <p className="datosTabla datosTabla2">$500</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/*<button className="btn btn-primary mb-4">anular venta</button>*/}
        </div>
    );
}