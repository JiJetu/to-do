import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");

  return (
    <>
      {noHeaderFooter || <Navbar />}

      <div className="min-h-[calc(100vh-340px)]">
        <Outlet />
      </div>

      {noHeaderFooter || <Footer />}
    </>
  );
};

export default MainLayout;
