import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // сначала не заметила в условиях что надо сделать через react hook form. буду благодарна если просто глазами пробежитесь
  //   const [errors, setErrors] = useState("");
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [passwordRepeat, setPasswordRepeat] = useState("");
  //   const [email, setEmail] = useState("");

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const validationError = [];

  //     if (username.length < 3 || username.length > 20) {
  //       validationError.push("Username must be between 3 and 20 characters");
  //     }

  //     if (password.length < 4 || password.length > 40) {
  //       validationError.push("password must be between 6 and 40 characters");
  //     }

  //     if (password !== passwordRepeat) {
  //       validationError.push("password and repeat password must match");
  //     }

  //     setErrors(validationError);
  //     localStorage.setItem("registeredEmail", email);
  //     localStorage.setItem("registeredPassword", password);
  //     localStorage.setItem("registeredUsername", username);

  //     if (validationError.length === 0) {
  //       console.log("submitted successufully!", { username, email, password });
  //       alert("registration successuful");
  //     }
  //   };
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

  const onSubmit = (data) => {
    console.log("Success:", data);
    alert("registration successuful!");
    localStorage.setItem("registeredUser", JSON.stringify(data));
     navigate("/login/sign-in");
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
