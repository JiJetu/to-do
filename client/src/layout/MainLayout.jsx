import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-340px)]">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default MainLayout;
