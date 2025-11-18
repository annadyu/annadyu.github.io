import HeaderNav from "./HeaderNav";
import { Link } from "react-router-dom";
import SignUp from "../login pages/SignUp";
import ProfileEditing from "../ProfileEditing";

const Header = ({ savedAvatar, savedUsername }) => {
  return (
    <>
      <div className="header-banner">
        <h1 className="banner-title">Realworld Blog</h1>
        <h3 className="banner-subtitle">A place to share your knowledge</h3>
        <h5 className="greating-user">
          Hello
          <Link to="profile"> {savedUsername}</Link>
        </h5>
        <div className="greeting-avatar">
          {savedAvatar && <img src={savedAvatar} alt="avatar" />}
        </div>
      </div>
    </>
  );
};

export default Header;
