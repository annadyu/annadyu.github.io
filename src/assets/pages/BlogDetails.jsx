import { NavLink, useLoaderData, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogDetails = ({ setArticles, articles }) => {
  const navigate = useNavigate();
  const article = useLoaderData();
  const { slug } = useParams();
  const [showConfirm, setShowConfirm] = useState(false);
// const newArticles = articles.filter((articles) => articles.slug !== slug);
//     setArticles(newArticles);
//     // localStorage.removeItem("localArticles");
//     localStorage.setItem("localArticles", JSON.stringify(newArticles));
//     navigate("/");
  const deleteArticle = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://realworld.habsida.net/api/articles/${slug}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          }
        });
      if (!response.ok) {
        const errorData = await response.json();
        console.log("SERVER ERROR:", errorData);
        alert(JSON.stringify(errorData.errors, null, 2));
        return;
      }
      // const responseData = await response.json();
      // console.log("Success", responseData);
      // localStorage.setItem(
      //   "createdArticle",
      //   JSON.stringify([responseData.article])
      // );
      alert("success!");
    } catch (err) {
      console.log(err);
      alert("Что-то пошло не так!");
    }
  };

  // const dataToString = new Date(date).toLocaleDateString("ko-KR", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });
  return (
    <div className="blog-details">
      <div className="details-info">
        <h2 className="details-title">{article.title}</h2>
        <h5 className="blog-author">{article.author.username}</h5>
      </div>
      <div className="details-body">
        <p className="details-description">{article.description}</p>
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
      <div className="article-btn-box">
        <button
          className="edit-article"
          onClick={() => navigate(`/articles/${slug}/edit`)}
        >
          Edit
        </button>
        <button className="delite-article" onClick={() => setShowConfirm(true)}>
          Delite
        </button>
        {showConfirm && (
          <div className="confirm-container">
            <h3 className="confirm-title">Are you sure?</h3>
            <div className="confirm-btn-box">
              <button
                className="confirm-yes"
                onClick={() => {
                  deleteArticle();
                  setShowConfirm(false);
                }}
              >
                Yes
              </button>
              <button
                className="confirm-no"
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const BlogDetailsLoader = async ({ params }) => {
  const { slug } = params;

  const localArticles = JSON.parse(localStorage.getItem("localArticles")) || [];
  const localArticle = localArticles.find((id) => id.slug === slug);
  if (localArticle) {
    return localArticle;
  }
  const res = await fetch(`https://realworld.habsida.net/api/articles/${slug}`);
  const data = await res.json();
  return data.article;
};

export default BlogDetails;
