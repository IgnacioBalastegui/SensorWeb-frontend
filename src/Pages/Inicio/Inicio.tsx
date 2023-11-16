import './inicio.css';


// PARTE DEL CARUSEL--------------------------------------------------
import { images } from "../../Images/data";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { LOOP } from "@splidejs/splide";
//--------------------------------------------------------------------


export const Inicio = () => {
  return (
    <div className="Inicio">
      <Splide
        options={{
          type: LOOP,
          autoplay: true,
        }}
        aria-label="My Favorite Images"
      >
        <SplideSlide>
          <img  className="imagen-carousel" src={images[10]} alt="imagen1" />
        </SplideSlide>

        <SplideSlide>
          <img className="imagen-carousel" src={images[11]} alt="imagen2" />
        </SplideSlide>

        <SplideSlide>
          <img className="imagen-carousel" src={images[12]} alt="imagen3" />
        </SplideSlide>

        <SplideSlide>
          <img className="imagen-carousel" src={images[13]} alt="imagen4" />
        </SplideSlide>
      </Splide>
      <div>
        <h1 className="h1-inicio">¡Bienvenidos!</h1>
      </div>

      <div className="container-inicio">
        <div className="columna1">
          <h2 className="h2-inicio">Te presentamos nuestro : </h2>
          <h2 className="h2-inicio">SENSOR DE PUERTA</h2>
          <p>
            La seguridad en el hogar como nuestro foco principal y el
            surgimiento de la tecnología y las diferentes plataformas móviles
            como iOS y Android, acompañado de un impresionante desarrollo
            tecnológico de dispositivos tales como teléfonos inteligentes que
            han revolucionado el desarrollo de las aplicaciones. Nosoatros
            trabajamos para dar solución a las situaciones que se viven hoy en
            día en los hogares, en cuestiones de seguridad y con ello brindar
            seguimiento de las personas que tendrán acceso a nuestra vivienda.
          </p>
        </div>

        <div className="columna2">
          <h2 className="h2-inicio">¿Que productos ofrecemos?</h2>
          <p>
            Nuestros sensores ofrecen fiabilidad a la hora de utilizarse y
            facilidad para entender su funcionamiento. Ideales para el cuidado
            del hogar. cuando hablamos de dispositivos de seguridad, en este
            caso un sensor de puerta nos queremos referir también a la
            aplicación que lo acompaña, con la cual tendremos acceso a las
            diferentes notificaciones de cuando una puerta se abre, o se cierra
            y quien es el usuario que estará haciendo uso de dicha aplicación.
          </p>
          <p>
            <h2 className="h2-inicio">¿Pero cuál es la necesidad que pretendemos cubrir? </h2>
            Básicamente queremos tener el control a mano, de las zonas que se
            son frecuentadas por los diferentes usuarios invitados. Es evidente
            que la seguridad, el ahorro de energía y la comodidad se constituyen
            como las mayores ventajas de tener una casa inteligente. Cabe
            señalar que la red en cuestión funciona de forma coordinada y
            permite que los dispositivos del hogar sean controlados a distancia.
            Los sistemas de seguridad en el hogar son muy útiles para la
            protección de la familia y para salvaguardar las posesiones más
            preciadas cuando la casa está vacía, cuando estamos en el trabajo,
            estamos de vacaciones o visitamos a un amigo o familiar el fin de
            semana.
          </p>
        </div>
      </div>
      {/*ANTIGUO INICIO

      <div className="blc-layer2 texto1">
        <div className="container">
          <div className="blc-layer2-main">
            <div className="col-md-6 blc-layer2-left">
              <h3>SOLUCIONES INTEGRALES DE SEGURIDAD</h3>
              <p className="tituloTexto">Seguridad electrónica para el hogar.
                Un dispoitivo adecuado para cada necesidad.</p>
            </div>
            <div className="col-md-6 blc-layer2-right">

            </div>
            <div className="clearfix"> </div>
          </div>
        </div>
      </div>

      <div className="texto2">
        <div className="row align-items-center mx-0">
          <div className="col">
            <h3 className="subtitulo">¿A que se dedica nuestro negocio?</h3>
            <p>Desde 2022 trabajamos para brindar soluciones integrales de seguridad a la medida de cada cliente.
              Nuestros valores se basan en el capital humano, la capacitación constante y el entrenamiento para poder
              garantizar un servicio completo y de calidad en toda la provincia de Buenos Aires.

              “La mejor seguridad es la prevención y la mejor prevención te la ofrece Grupo Vanguardias”

              Trabajamos para un amplia gama de rubros e industrias como Constructoras, Fábricas, Barrios cerrados,
              Countries, Edificios,Congresos, eventos y otros.</p>
          </div>
          <div className="col">
            <h3 className="subtitulo">¿Que productos ofrecemos?</h3>
            <p>Nuestros sensores ofrecen fiabilidad a la hora de utilizarse y facilidad para entender su funcionamiento.
              Ideales para el cuidado del hogar y saber si algun ser querido logro volver a su domicilio.
              Son de tamaño compacto, eso hace que no sean ningun estorbo.
            </p>
          </div>

        </div>


      </div>


  */}
    </div>
  );
}
