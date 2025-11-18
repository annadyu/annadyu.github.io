import { NavLink, Outlet } from "react-router-dom";

const LogInLayout = () => {
  return (
    <div className="login-page">
      <h1 className="login-title">Log in</h1>
      <nav className="login-nav">
        <NavLink className="registration-link" to="sign-up">registration</NavLink>
        <NavLink className="login-link" to="sign-in">Sign In</NavLink>
      </nav>
        <Outlet />
    </div>
  );
};

export default LogInLayout;
