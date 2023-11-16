import { createContext, useState } from "react";

/*interface Product {
  id: number;
}

interface Item {
  id: number;
  quanty: number;
}
//feisimo, arreglar
let algo: any;
export const dataContext= createContext(algo);

const DataProvider = (children: string ) => {
    const [cart, setCart] = useState([]);
  
    const buyProducts = (product:Product) => {
      const productrepeat = cart.find((productoCarrito:Item) => productoCarrito.id === product.id);
  
      if (productrepeat) {
        setCart(
          cart.map((productoCarrito:Item) =>
          productoCarrito.id === product.id
              ? { ...product, quanty: productrepeat.quanty + 1 }
              : productoCarrito
          )
        );
      } else {
        setCart([...cart, product]);
      }
    };
  
    return (
      <dataContext.Provider value={{ cart, setCart, buyProducts }}>
        {children}
      </dataContext.Provider>
    );
  };
  
  export default DataProvider;*/