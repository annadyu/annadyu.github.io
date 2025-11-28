import SignUp from "./SignUp";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../Zustand";

const SignIn = () => {
  const navigate = useNavigate();
  const setUser = LoginUser((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    try {
      const response = await fetch(
        "https://realworld.habsida.net/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: { email, password },
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Что-то пошло не так!");
      }

      const responseData = await response.json();
      console.log("Success", responseData);
      localStorage.setItem("registeredUser", JSON.stringify(responseData.user));
      localStorage.setItem("token", responseData.user.token);
   
      setUser(responseData.user);
      alert("log in successuful!");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Что-то пошло не так!");
    }
  };

  return (
    <div className="signin">
      <form
        className="signin-form"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="signin-title">Log In</h1>
        <div className="signin-inputs">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Enter email"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              maxLength: {
                value: 40,
                message: "Password must be under 40 characters",
              },
            })}
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <button className="signin-btn" type="submit">
          Sign In
        </button>
      </form>
      <div className="registration-nav">
        <p> Don't have an account yet? </p>
        <NavLink to="/sign-up" className="registration-nav-link">
          Sign Up first
        </NavLink>
      </div>
    </div>
  );
};
export default SignIn;
