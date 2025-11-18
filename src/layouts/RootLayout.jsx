import { NavLink, Outlet } from "react-router-dom";
import HeaderNav from "../assets/pages/main-page/HeaderNav";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <header>
        <HeaderNav />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
