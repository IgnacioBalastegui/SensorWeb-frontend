import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const TemplateHeaderFooter = () => {
  return (
    <>
      <Header  />
      <Outlet />
      <Footer />
    </>
  );
};
