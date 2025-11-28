import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const PageEditing = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const createdArticle =
    JSON.parse(localStorage.getItem("createdArticle")) || [];
  const article = createdArticle.find((el) => el.slug === slug);

  if (!article) return <p>Loading...</p>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
    },
  });

  const onSubmit = async (data) => {
    const { title, description, body } = data;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://realworld.habsida.net/api/articles/${slug}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            article: { title, description, body },
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
      navigate(`/articles/${responseData.article.slug}`);
    } catch (err) {
      console.log(err);
      alert("Что-то пошло не так!");
    }
  };

  return (
    <div className="create-article">
      <form onSubmit={handleSubmit(onSubmit)} className="new-article-form">
        <h1 className="article-edit-title">Edit your article</h1>
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
            <p className="error">min 3 characters</p>
          )}
        </div>
        <button type="submit" className="new-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PageEditing;
