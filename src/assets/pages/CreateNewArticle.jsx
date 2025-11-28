import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreateNewArticle = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tagList: "",
    },
  });

  // const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
  //   const savedUsername = savedUser?.username;
  //   const addNewArticle = () => {
  //     const newArticle = {
  //       slug: Date.now().toString(),
  //       title: data.title,
  //       description: data.description,
  //       body: data.body,
  //       createdAt: new Date().toISOString(),
  //       favoritesCount: 0,
  //       tagList: [],
  //       author: {
  //         username: savedUsername,
  //       },
  //     };
  //     setArticles([newArticle, ...articles]);
  //     const updated = [newArticle, ...articles];
  //     localStorage.setItem("localArticles", JSON.stringify(updated));
  //   };
  //   addNewArticle();

  //   reset();

  const onSubmit = async (data) => {
    const {
      title,
      description,
      body,
      tagList,
    } = data;
    const tags = tagList ? tagList.split(",").map((tag) => tag.trim()) : [];
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://realworld.habsida.net/api/articles",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            article: { title, description, body, tagList: tags },
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log("SERVER ERROR:", errorData);
        alert(JSON.stringify(errorData.errors, null, 2));
        return;
      }
      const responseData = await response.json();
      console.log("Success", responseData);
      localStorage.setItem(
        "createdArticle",
        JSON.stringify([responseData.article])
      );
      alert("success!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Что-то пошло не так!");
    }
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
            {...register("body", { required: true, minLength: 3 })}
          />
          {errors.body && (
            <p className="error">Article body is required (min 3 characters)</p>
          )}
          <input
            className="new-input-article"
            placeholder="Add your tags here..."
            {...register("tagList", { required: false, minLength: 3 })}
          />
          {errors.body && <p className="error">min 3 characters</p>}
        </div>
        <button type="submit" className="new-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNewArticle;
