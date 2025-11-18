import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateNewArticle = ({ articles, setArticles }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
    const savedUsername = savedUser?.username;
    const addNewArticle = () => {
      const newArticle = {
        slug: Date.now().toString(),
        title: data.title,
        description: data.description,
        body: data.body,
        createdAt: new Date().toISOString(),
        favoritesCount: 0,
        tagList: [],
        author: {
          username: savedUsername,
        },
      };
      setArticles([newArticle, ...articles]);
      const updated = [newArticle, ...articles];
      localStorage.setItem("localArticles", JSON.stringify(updated));
    };
    addNewArticle();

    reset();
  };

  return (
    <div className="create-article">
      <form onSubmit={handleSubmit(onSubmit)} className="new-article-form">
        <h1 className="new-title">Create your own article!</h1>
        <div className="new-inputs">
          <input
            className="new-input-title"
            placeholder="Title"
            {...register("title", { required: true })}
          />
          {errors.title && <p className="error">Title is required</p>}

          <input
            className="new-input-description"
            placeholder="Short description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="error">Description is required</p>
          )}
          <input
            className="new-input-article"
            placeholder="Write your article here..."
            {...register("body", { required: true, minLength: 20 })}
          />
          {errors.body && (
            <p className="error">
              Article body is required (min 20 characters)
            </p>
          )}
        </div>
        <button type="submit" className="new-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNewArticle;
