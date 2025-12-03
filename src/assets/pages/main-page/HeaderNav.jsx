import { NavLink } from "react-router-dom";
import { LoginUser } from "../Zustand";

const HeaderNav = () => {
const { user } = LoginUser();

  return (
    <div className="header-nav">
      <h3 className="nav-title">Realworld blog</h3>
      <nav>
        <NavLink to="/" className="nav-tag">
          Home
        </NavLink>
        <NavLink to="/new-article" className="nav-tag new-post">
          New post
        </NavLink>
        {user ? (
          <NavLink to="/profile" className="nav-tag settings">
            Setings
          </NavLink>
        ) : (
          <NavLink to="/sign-in" className="nav-tag settings">
            Setings
          </NavLink>
        )}
        {user ? (
          <NavLink className="nav-tag login-icon"> {user.username}</NavLink>
        ) : (
          <NavLink to="/sign-in" className="nav-tag login-icon">
            Log In
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default HeaderNav;
