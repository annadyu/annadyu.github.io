import SignUp from "./SignUp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState([]);

  const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
  const savedEmail = savedUser?.email;
  const savedPassword = savedUser?.password;

   const navigate = useNavigate();

  const loginInfoCheck = (e) => {
    e.preventDefault();
    const newloginErrors = [];

    if (loginEmail !== savedEmail) {
      newloginErrors.push("non-existing login!");
    }

    if (loginPassword !== savedPassword) {
      newloginErrors.push("password invalid!");
    }

    setLoginErrors(newloginErrors);

    if (newloginErrors.length === 0) {
      console.log("log in successufully!", { loginEmail, loginPassword });
      alert("log in successufully");
    }

     navigate("/");
  };

  return (
    <div className="signin">
      <form action="" className="signin-form" onSubmit={loginInfoCheck}>
        <h1 className="signin-title">Sign In</h1>
        {loginErrors.length > 0 ? (
          <ul className="signin-errors-list">
            {loginErrors.map((err, index) => (
              <li className="signin-errors-item" key={index}>
                {err}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div className="signin-inputs">
              <input
                className="signin-email-input"
                type="text"
                value={loginEmail}
                placeholder="Enter Email"
                onChange={(el) => setLoginEmail(el.target.value)}
                required
              />
              
              <input
                className="signin-password-input"
                type="password"
                value={loginPassword}
                placeholder="Enter Password"
                onChange={(el) => setLoginPassword(el.target.value)}
                required
              />
            <button type="submit" className="signin-btn">
              Sign In
            </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default SignIn;
