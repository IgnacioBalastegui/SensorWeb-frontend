interface Sensor {
  RUTA_SIN_PARAMETROS: string;
  RUTA_CON_PARAMETROS: string;
}

const INICIO: string = "/";

const ACERCADE: string = "/acercaDeNosotros";
const CARRITO: string = "/carrito";
const FORMADEPAGO: string = "/formaDePago";
const FORMAENVIO: string = "/formaDeEnvio";
const RESUMEN: string = "/resumen";

const CONTACTO: string = "/contacto";
const FAVORITOS: string = "/favoritos";
const SENSORES: string = "/sensores";

const SENSOR: Sensor = {
  RUTA_SIN_PARAMETROS: "/sensor",
  RUTA_CON_PARAMETROS: "/sensor/:idProducto",
};

const LOGIN: string = "/login";
const REGISTRO: string = "/registro";
const CONFIRMAR_REGISTRO: string = "/confirmarRegistro";
const COMPRAS_REALIZADAS: string = "/comprasrealizadas";
const PERFIL: string = "/perfil";
const EDITAR_PERFIL: string = "/editarPerfil";
const CONFIRMAR_CAMBIAR_MAIL: string = "/ConfirmarCambiarMail";
const CAMBIAR_CONTRASENIA: string = "/cambiarContrasenia";
const CONFIRMAR_CAMBIAR_CONTRASENIA: string = "/ConfirmarCambiarContrasenia";
const ELIMINAR_PERFIL: string = "/EliminarPerfil";
const ERROR_404: string = "/error404";

const RUTA = {
  INICIO,
  ACERCADE,
  CARRITO,
  FORMADEPAGO,
  FORMAENVIO,
  RESUMEN,
  CONTACTO,
  FAVORITOS,
  SENSORES,
  SENSOR,
  LOGIN,
  REGISTRO,
  CONFIRMAR_REGISTRO,
  COMPRAS_REALIZADAS,
  PERFIL,
  EDITAR_PERFIL,
  CONFIRMAR_CAMBIAR_MAIL,
  CAMBIAR_CONTRASENIA,
  CONFIRMAR_CAMBIAR_CONTRASENIA,
  ELIMINAR_PERFIL,
  ERROR_404
};

export default RUTA;
