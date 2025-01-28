import { Outlet } from "react-router-dom";
import { StickyNavbar } from "../components/Navbar/StickyNavbar";
import { FooterWithLogo } from "../components/Footer/FooterWithLogo";

const MainLayout = () => {
  return (
    <div className="max-w-[1320px] mx-auto flex flex-col min-h-screen">
      <div>
        <StickyNavbar></StickyNavbar>
      </div>
      <div className="flex-grow mt-10">
        <Outlet></Outlet>
      </div>

      <FooterWithLogo></FooterWithLogo>
    </div>
  );
};

export default MainLayout;
