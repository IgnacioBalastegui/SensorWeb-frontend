import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sensores } from "./Pages/Sensores/Sensores";
import { InformacionSensor } from "./Pages/Sensores/Sensor/InformacionSensor/InformacionSensor";
import { Inicio } from "./Pages/Inicio/Inicio";
import { AcercaDeNosotros } from "./Pages/AcercaDeNosotros/AcercaDeNosotros";
import { Carrito } from "./Pages/Carrito/Carrito";
import { FormaDePago } from "./Pages/FormaDePago/FormaDePago";
import { FormaDeEnvio } from "./Pages/FormaDeEnvio/FormaDeEnvio";
import { Resumen } from "./Pages/FormaDePago/Resumen";
import { Favoritos } from "./Pages/Favoritos/Favoritos";
import { Login } from "./Pages/Login/Login";
import { Registro } from "./Pages/Registro/Registro";
import { ConfirmarRegistro } from "./Pages/Registro/ConfirmarRegistro";
import { TemplateHeaderFooter } from "./Components/TemplateHeaderFooter/TemplateHeaderFooter";
import RUTA from "./routes";
import { Contacto } from "./Pages/Contacto/Contacto";
import { Perfil } from "./Pages/SeccionesSoloLogueados/Perfil/Perfil";
import { EditarPerfil } from "./Pages/SeccionesSoloLogueados/Perfil/EditarPerfil";
import { CambiarContrasenia } from "./Pages/SeccionesSoloLogueados/Perfil/CambiarContraseña";
import { CompraRealizada } from "./Pages/SeccionesSoloLogueados/ComprasRealizadas/CompraRealizada";
import { DataProvider } from "./context/DataContext";
import { Error404 } from "./Pages/Error404/Error404";
import { ConfirmarCambioContraseña } from "./Pages/SeccionesSoloLogueados/Perfil/ConfirmarCambioContraseña";
import { ConfirmarCambioMail } from "./Pages/SeccionesSoloLogueados/Perfil/ConfirmarCambioMail";
import { EliminarPerfil } from "./Pages/SeccionesSoloLogueados/Perfil/EliminarPerfil";
//import { Test } from "./Pages/Test/Test";



function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <Routes>
            <Route path={RUTA.INICIO} element={<TemplateHeaderFooter />}>
              <Route path={RUTA.ACERCADE} element={<AcercaDeNosotros />} />
              <Route path={RUTA.CONTACTO} element={<Contacto />} />
              <Route path={RUTA.FAVORITOS} element={<Favoritos />} />
              <Route path={RUTA.SENSORES} element={<Sensores />} />
              <Route
                path={RUTA.SENSOR.RUTA_CON_PARAMETROS}
                element={<InformacionSensor />}
              />
              <Route path={RUTA.CARRITO} element={<Carrito />} />
              <Route path={RUTA.FORMADEPAGO} element={<FormaDePago />} />
              <Route path={RUTA.FORMAENVIO} element={<FormaDeEnvio />} />
              <Route path={RUTA.RESUMEN} element={<Resumen />} />

              <Route path={RUTA.LOGIN} element={<Login />} />
              <Route path={RUTA.REGISTRO} element={<Registro />} />
              <Route path={RUTA.CONFIRMAR_REGISTRO} element={<ConfirmarRegistro />} />
              <Route path={RUTA.INICIO} element={<Inicio />} />
              <Route path={RUTA.ERROR_404} element={<Error404 />} />

              <Route path={RUTA.PERFIL} element={<Perfil />} />
              <Route path={RUTA.EDITAR_PERFIL} element={<EditarPerfil />} />
              <Route path={RUTA.CONFIRMAR_CAMBIAR_MAIL} element={<ConfirmarCambioMail />} />
              <Route path={RUTA.CAMBIAR_CONTRASENIA} element={<CambiarContrasenia />} />
              <Route path={RUTA.CONFIRMAR_CAMBIAR_CONTRASENIA} element={<ConfirmarCambioContraseña />} />
              <Route path={RUTA.ELIMINAR_PERFIL} element={<EliminarPerfil />} />
              <Route
                path={RUTA.COMPRAS_REALIZADAS}
                element={<CompraRealizada />}
              />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
