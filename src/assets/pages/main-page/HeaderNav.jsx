import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../Zustand";

const HeaderNav = () => {
  const navigate = useNavigate();

  const user = LoginUser((state) => state.user);

  const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
  // const savedUsername = savedUser?.username;

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
  {user || savedUser ?  (
          <NavLink to="/profile" className="nav-tag settings">
            Setings
          </NavLink>
        ) : (
          <NavLink to="/sign-in" className="nav-tag settings">
            Setings
          </NavLink>
        )}
     {user || savedUser ?  (
          <NavLink className="nav-tag login-icon">   {user?.username || savedUser.username}</NavLink>
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
