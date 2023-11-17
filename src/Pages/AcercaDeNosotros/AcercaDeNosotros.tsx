import "./acercaDeNosotros.css";
import { images } from "../../Images/data";

export const AcercaDeNosotros = () => {
    return (
        <div className="AcercaDeNosotros">
            <div className="textoAcercaDe">
                <div className="col contenidoAcercaDe">
                    <div>
                        <img className="imagenAcercaDe" src={images[5]} alt="seguridad" />
                    </div>
                    <p>
                        <h3>
                            ¿Buscamos esa sensación de confianza de que todo estará bien?
                        </h3>
                        En nuestras vidas en general buscamos tranquilidad, y seguridad es
                        por este motivo que nuestro SENSOR DE PUERTA llega para ocuparse de
                        tu seguridad y la de los tuyos.Nuestra meta es llegar a ser tu mejor
                        aliado y brindarte los lineamientos necesarios para proteger tu
                        hogar en cualquier situación de peligro por ejemplo: si un ladrón
                        entra en casa, si se produce un accidente doméstico, si un familiar
                        necesita atención sanitaria urgente. Para garantizar la excelencia
                        de nuestro SENSOR DE PUERTA, controlamos por completo nuestra cadena
                        de valor, desde el diseño y desarrollo de cada producto hasta el
                        manejo de su aplicacion. Protegé a los tuyos con nuestro SENSOR DE
                        PUERTA.
                        <div className="linea"></div>
                    </p>
                </div>
            </div>

            <div className="textoAcercaDe">
                <div className="col contenidoAcercaDe">
                    <div>
                        <img className="imagenAcercaDe" src={images[4]} alt="seguridad" />
                    </div>
                    <p>
                        <h3>SEGURIDAD EN TUS MANOS</h3>
                        Nuestro SENSOR DE PUERTA, vendría a sumarse a los sistemas de
                        seguridad en el hogar, y no solo podría usarse como sistema
                        anti-robos, sino también como sistema de control. Por ejemplo, si un
                        hijo, con edad para quedarse solo en casa, o que personas, con una
                        edad avanzada, deben quedarse solos por un momento, es preciso que
                        nos interesaría saber cuando salen del domicilio y saber cuando
                        vuelven para no preocuparnos. Los sistemas de seguridad en el hogar
                        se han hecho indispensables para todo aquel que desee no tener la
                        preocupación por el cuidado de su hogar cuando está lejos de este o
                        por su integridad física mientras duerme.
                        <div className="linea"></div>
                    </p>
                </div>
            </div>

            <div className="textoAcercaDe">
                <div className="col contenidoAcercaDe">
                    <div>
                        <img className="imagenAcercaDe" src={images[8]} alt="seguridad" />
                    </div>
                    <div>
                        <p>
                            <h3>VALORES</h3>
                            Pasión por todo lo que hacemos, pasión por mejorar nuestro
                            producto cada dia. Nos apasiona nuestra misión, sabemos que lo que
                            hacemos es importante y que tiene una enorme trascendencia social.
                            <div className="linea"></div>
                        </p>
                    </div>
                </div>

                <div className="textoAcercaDe">
                    <div className="col contenidoAcercaDe">
                        <div>
                            <img className="imagenAcercaDe" src={images[1]} alt="seguridad" />
                        </div>
                        <p>
                            <h3>INNOVACION</h3>
                            Ideamos soluciones nuevas para resolver problemas que han surgido
                            en definitiva, para mejorar nuestro producto y nuestro servicio.
                            <div className="linea"></div>
                        </p>
                    </div>
                </div>

                <div className="textoAcercaDe">
                    <div className="col contenidoAcercaDe">
                        <div>
                            <img className="imagenAcercaDe" src={images[0]} alt="seguridad" />
                        </div>
                        <p>
                            <h3>NUESTRO EQUIPO</h3>
                            Juntos sumamos más, con nuevas ideas y trabajando sobre el mismo
                            objetivo hace que disfrutemos de los que hacemos. Para SENSOR DE
                            PUERTA trabajar en equipo es lograr un buen desempeño en nuestro
                            producto y es la parte que nos llena de satisfacción.
                            <div className="linea"></div>
                        </p>
                    </div>
                </div>
            </div>
            <div className="textoAcercaDe">
                <div className="col contenidoAcercaDe">
                    <div>
                        <img className="imagenAcercaDe" src={images[9]} alt="seguridad" />
                    </div>
                    <p>
                        <h3>RESPONSABILIDAD</h3>
                        Nos dedicamos a una actividad muy sensible, en la que están en juego
                        la seguridad y la tranquilidad de nuestros clientes.
                        <div className="linea"></div>
                    </p>
                </div>
            </div>
        </div>
    );
};


