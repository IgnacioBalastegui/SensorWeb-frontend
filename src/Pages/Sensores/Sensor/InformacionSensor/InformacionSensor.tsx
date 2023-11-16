import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sensor from "../../../../Images/sensor.jpg";
import "./informacionSensor.css";
import axios from "axios";
import { SeccionComentario } from "./SeccionComentario/SeccionComentario";
import { IComentario } from "./SeccionComentario/interface";
import { useForm } from "react-hook-form";
import RUTA from "../../../../routes";

//import { dataContext } from "../../../../Components/Context/DataContext";
import { ICarrito } from "../../../Carrito/Interface";

interface Producto {
  id?: number;
  name?: string;
  description?: string;
  idUser?: number;
  price?: number;
  imageBase64?: string;
}

interface IComprarPrducto {
  email: string;
  productId: number;
  quantity: number;
}

interface InputsFormularioLogin {
  cantidad: number;
}

interface Cantidad {
  quantity: number;
}


export const InformacionSensor = () => {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState<Producto>({});
  const [comentarios, setComentarios] = useState<IComentario[]>([]);
  const [error, setError] = useState<string>("");
  const [exitoso, setExitoso] = useState<string>("");

  const [cart, setCart] = useState<ICarrito[]>([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsFormularioLogin>({
    mode: "onChange",
  });

  const onSubmit = handleSubmit((data, event) => {
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
      const email = values.email;

      const productoComprado: IComprarPrducto = {
        email: email,
        productId: Number(idProducto),
        quantity: data.cantidad,
      };

      const URL: string = "http://localhost:8080/sensor/api/sales";

      axios
        .post(URL, productoComprado, config)
        .then((res) => {
          setError("");
          setExitoso("Se realizo la compra correctamente");
        })
        .catch((err) => {
          setExitoso("");
          setError(err.response.data.error.message);
        });
    } else {
      setError("Necesitas estar logueado para poder comprar");
    }
  });

  const getProducto = (): void => {
    axios
      .get("http://localhost:8080/sensor/api/products/" + idProducto)
      .then((res) => {
        console.log("productos: " + res.data)
        setProducto(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.data.error.message);
        navigate(RUTA.ERROR_404)
      });
  };
 
  const getComentarios = () => {
    axios
      .get("http://localhost:8080/sensor/api/comments/products/" + idProducto)
      .then((res) => {
        setComentarios(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.data.error.message);
      });
  };

  const agregarFavoritos = () => {

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
  
      const URL: string =
          "http://localhost:8080/sensor/api/favorites/products/" + idProducto;
  
      axios
      .post(URL,{}, config)
      .then((res) => {
        console.log("agregado a favoritos")
        setError("");
        setExitoso("Agregado a favoritos");
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.data.error.message);

        setExitoso("");
        setError(err.response.data.error.message);
      });
    }else {
      navigate(RUTA.LOGIN);
    }
   
  };

  useEffect(() => {
    getProducto();
    getComentarios();
  }, []);

  /*const buyProduct = (producto: Producto) => {
   // console.log(producto)

    const productrepeat = cart.find((productoCarrito:ICarrito) => productoCarrito.id === producto.id);
    if (productrepeat) {
      setCart(
        cart.map((productoCarrito:ICarrito) =>
        productoCarrito.id === producto.id
            ? { ...producto, quanty: /*productrepeat.quanty*+ 1 }
            : productoCarrito
        )
      );
    } else {
      setCart([...cart, producto]);
    }
  }*/

  const agregarCarrito = () => {

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
  
      const cantidad: Cantidad = {
        quantity: 1
      };

      const URL: string =
          "http://localhost:8080/sensor/api/carts/products/" + idProducto;
  
      axios
      .post(URL,cantidad, config)
      .then((res) => {
        console.log("agregado al carrito")
        console.log(res.data)
        setError("");
        setExitoso("Agregado al carrito");
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.data.error.message);

        setExitoso("");
        setError(err.response.data.error.message);
      });
    }else {
      navigate(RUTA.LOGIN);
    }
   
  };

  return (
    <div className="SensoresDesc">
      <div className="single">
        <div className="contaianer">
          <div className="single-main">
            <div className="row mx-0">
              <div className="col-md-5 single-top">
                <div className="flexslider">
                  <img className="imagenDesc" src={producto.imageBase64} alt="imagen del sensor" />
                </div>
              </div>
              <div className="col-md-7 single-top-left simpleCart_shelfItem descripcion">
                <h1>{producto.name}</h1>
                <h6 className="item_price">${producto.price}</h6>
                <p>{producto.description}</p>

                {/*<form className="ml-0" onSubmit={onSubmit}>
                  <div className="form-outline mb-4">
                    <label className="form-label">Cantidad</label>

                    <input
                      type="text"
                      className={`${"form-control"} ${errors.cantidad && "cuadroError"
                        }`}
                      {...register("cantidad", {
                        required: {
                          value: true,
                          message: "Ingrese cantidad",
                        },
                      })}
                    />

                    {errors.cantidad && (
                      <span className={errors.cantidad && "mensajeError"}>
                        {errors.cantidad.message}
                      </span>
                    )}
                  </div>
                    </form>*/}

                <div className="text-center text-md-left botonEnvio ml-0">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4 "

                      onClick={/*() => buyProduct(producto)*/agregarCarrito}>

                      Agregar al carrito
                    </button>
                  </div>


                  <div className="text-center text-md-left botonEnvio ml-0">
                    <button className="btn btn-primary btn-block mb-4 botonFavoritos"
                    onClick={agregarFavoritos}>
                      <i className="fa fa-star iconoEstrella"></i>Agregar a
                      favoritos
                    </button>
                  </div>

                {exitoso && (
                  <div className="alert alert-success alerta ml-0">
                    {exitoso}
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger alerta ml-0">
                    {error}
                  </div>
                )}
              </div>
            </div>
            <hr />
            <SeccionComentario
              comentarios={comentarios}
              idProducto={Number(idProducto)}
              getComentarios={getComentarios}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
