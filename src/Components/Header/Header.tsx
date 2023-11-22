import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import logo from "../../Images/LogoHeader.png";
import RUTA from "../../routes";
import "./styles.css";

export const Header = () => {
  const [menu, setMenu] = useState(false);
  const { isLogged } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const cerrarSesion = () => {
    window.localStorage.removeItem("token");
    navigate(RUTA.INICIO);
  };

  return (
    <>
      <header className="Cabecera navbar-expand-lg navbar-dark bg-dark">
        <div /*className="logo"*/>
          <a href="/">
            <img src={logo} alt="logo" className="logo"/>
          </a>
        </div>

        <button onClick={toggleMenu} className="Cabecera-button">
          <svg
            className="Cabecera-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>

        <nav className={`Cabecera-nav ${menu ? "isActive" : ""}`}>
          <ul className="Cabecera-ul">
            <Link to="/" className="Cabecera-li">
              INICIO
            </Link>

            <Link to="/sensores" className="Cabecera-li">
              SENSORES
            </Link>
            <Link to="/contacto" className="Cabecera-li">
              CONTACTO
            </Link>
            <Link to="/acercaDeNosotros" className="Cabecera-li">
              ACERCA DE NOSOTROS
            </Link>
            {isLogged() && (
              <Link to="/favoritos" className="Cabecera-li">
                FAVORITOS
              </Link>
            )}
            {isLogged() && (
              <Link to="/perfil" className="Cabecera-li">
                PERFIL
              </Link>
            )}

            <div>
              <ul className="Cabecera-ul">
                <Link to="/carrito" className="Cabecera-li">
                  🛒
                </Link>
              </ul>
            </div>
            {!isLogged() && (
              <div>
                <ul className="Cabecera-ul">
                  <Link to="/login" className="Cabecera-li">
                    INICIAR SESION
                  </Link>
                </ul>
              </div>
            )}

            {isLogged() && (
              <div>
                <ul className="Cabecera-ul">
                  <Link
                    to="/login"
                    className="Cabecera-li"
                    onClick={cerrarSesion}
                  >
                    CERRAR SESION
                  </Link>
                </ul>
              </div>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};
/*import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import logo from "../../Images/LogoHeader.png";
import RUTA from "../../routes";
import "./styles.css";

export const Header = () => {
  const [menu, setMenu] = useState(false);
  const { isLogged } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const cerrarSesion = () => {
    window.localStorage.removeItem("token");
    navigate(RUTA.INICIO);
  };

  return (
    <>
      <header>
        {/*SDK MercadoPago.js*
<script src="https://sdk.mercadopago.com/js/v2"></script>*}


        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a href="/">
            <img src={logo} alt="logo" className="logo"/>
          </a>
          <button onClick={toggleMenu} className="Cabecera-button">
          <svg
            className="Cabecera-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <Link to="/" className="nav-item nav-link">
                Inicio
              </Link>
              <Link to="/acercaDeNosotros" className="nav-item nav-link">
                Acerca de nosotros
              </Link>
              <Link to="/sensores" className="nav-item nav-link">
                Sensores
              </Link>
              <Link to="/contacto" className="nav-item nav-link">
                Contacto
              </Link>
              {isLogged() && (
                <Link to="/favoritos" className="nav-item nav-link">
                  Favoritos
                </Link>
              )}
              {isLogged() && (
                <Link to="/perfil" className="nav-item nav-link">
                  Perfil
                </Link>
              )}
            </ul>

          </div>
          <div >
            <ul className="navbar-nav">
              <Link to="/carrito" className="nav-item nav-link">
                🛒
              </Link>
            </ul>
          </div>
          {!isLogged() && (
            <div>
              <ul className="navbar-nav">
                <Link to="/login" className="nav-item nav-link">
                  Iniciar Sesion
                </Link>
              </ul>
            </div>
          )}

          {isLogged() && (
            <div>
              <ul className="navbar-nav">
                <Link
                  to="/login"
                  className="nav-item nav-link"
                  onClick={cerrarSesion}
                >
                  Cerrar Sesion
                </Link>
              </ul>
            </div>
          )}

        </nav>
      </header>
    </>
  );
};*/