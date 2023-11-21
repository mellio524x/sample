import { Outlet } from "react-router-dom";
import NavBar from ".././components/navigation/NavBar";
import Footer from ".././components/footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
