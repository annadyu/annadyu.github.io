import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
  });

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    try {
      const response = await fetch("https://realworld.habsida.net/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: { username, email, password },
        }),
      });
      if (!response.ok) {
        throw new Error("Что-то пошло не так!");
      }

      const responseData = await response.json();
      console.log("Success", responseData);
      localStorage.setItem("registeredUser", JSON.stringify(responseData.user));
      alert("registration successuful!");

      navigate("/sign-in");
    } catch (error) {
      console.log(error);
      alert("Что-то пошло не так!");
    }
  };

  const password = watch("password");

  return (
    <div className="signup">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="signup-title">Registration</h1>
        <div className="signup-inputs">
          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Username must be shorter than 20 characters",
              },
            })}
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
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

          <input
            type="password"
            {...register("passwordRepeat", {
              required: "Repeat password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Repeat password"
          />
        </div>
        {errors.passwordRepeat && (
          <p className="error">{errors.passwordRepeat.message}</p>
        )}

        <div className="signup-agree">
          <p>By creating an account you agree to personal data processing</p>
          <input type="checkbox" required />
        </div>

        <button className="signup-btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
