import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const PageEditing = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const localArticles = JSON.parse(localStorage.getItem("localArticles")) || [];
  const article = localArticles.find((el) => el.slug === slug);

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

  const onSubmit = (data) => {
    const updatedArticles = localArticles.map((el) =>
      el.slug === slug
        ? {
            ...el,
            title: data.title,
            description: data.description,
            body: data.body,
          }
        : el
    );
    localStorage.setItem("localArticles", JSON.stringify(updatedArticles));
    navigate(`/articles/${slug}`);
  };
  return (
    <div className="create-article">
      <form onSubmit={handleSubmit(onSubmit)} className="new-article-form">
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

export default PageEditing;
