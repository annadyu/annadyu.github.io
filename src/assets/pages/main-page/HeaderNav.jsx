import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HeaderNav = () => {
  const navigate = useNavigate();
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
        <NavLink to="/settings" className="nav-tag settings">
          Setings
        </NavLink>
        <NavLink to="/login" className="nav-tag login-icon">
          Log In
        </NavLink>
      </nav>
    </div>
  );
};

export default HeaderNav;
