import { createContext } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {


  const isLogged = () => {
    if (window.localStorage.getItem("token") === null) {
      return false;
    } else {
      return true;
    }
  }

  const data = { isLogged }

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
}

export { DataProvider };

export default DataContext;