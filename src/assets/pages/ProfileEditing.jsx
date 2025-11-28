import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ProfileEditing = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("registeredUser");
    navigate("/login");
  };
  const savedUser = JSON.parse(localStorage.getItem("registeredUser")) || {};
  const savedEmail = savedUser?.email ?? "";
  const savedPassword = "";
  const savedUsername = savedUser?.username ?? "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: savedUsername,
      email: savedEmail,
      password: savedPassword,
      passwordRepeat: savedPassword,
      avatar: savedUser?.image ?? "",
    },
  });
  const onSubmit = async (data) => {
    const { username, email, password, avatar } = data;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://realworld.habsida.net/api/user", {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          image: avatar,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log("SERVER ERROR:", errorData);
        alert(JSON.stringify(errorData.errors, null, 2));
        return;
      }

      const responseData = await response.json();
      localStorage.setItem("registeredUser", JSON.stringify(responseData.user));
      console.log("Success", responseData);
      alert("editing successuful!");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Что-то пошло не так!");
    }
  };
  const password = watch("password");

  return (
    <div className="editing">
      <form className="editing-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="editing-title">Your Settings</h1>
        <div className="editing-inputs">
          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 1,
                message: "Username must not be empty",
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
            type="text"
            {...register("avatar", {
              required: false,
              pattern: {
                value: /^https?:\/\/.*\.(jpg|jpeg|png|gif|svg)$/i,
                message: "Please enter a valid image URL",
              },
            })}
            placeholder="Enter avatar Url"
          />
          {errors.avatar && <p className="error">{errors.avatar.message}</p>}
          <button className="editing-btn" type="submit">
            Submit
          </button>
          <button type="button" className="logout-btn" onClick={handleLogout}>
            Or click here to logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditing;
