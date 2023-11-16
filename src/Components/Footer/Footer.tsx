import './style.css';


export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Sensores</h4>

            <h6>Telefono: +54 11 2233 4455</h6>
            <h6>Direccion: Calle falsa 123</h6>
            <h6>Mail: sensores@gmail.com</h6>
          </div>
          <div className="footer-col">
            <h4>Metodo de pago</h4>
            <ul>
              <li>
                <a href="#">Mastercard</a>
              </li>
              <li>
                <a href="#">Visa</a>
              </li>
              <li>
                <a href="#">Tarjeta Naranja</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Asociados</h4>
            <h6>Ignacio Gabriel Balastegui</h6>
            <h6>Matias Alejandro Torrez</h6>
            <h6>Johanna Arenas Esteban</h6>
          </div>
          <div className="footer-col">
            <h4>Redes sociales</h4>
            <div className="social-links">
              <a href="https://es-la.facebook.com/">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/?lang=es">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
