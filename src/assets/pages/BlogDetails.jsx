import { NavLink, useLoaderData, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "./Zustand";

const BlogDetails = () => {
  const navigate = useNavigate();
  const article = useLoaderData();
  const { user } = LoginUser();
  const { slug } = useParams();
  const [showConfirm, setShowConfirm] = useState(false);
  // const [isUser, setIsUser] = useState(false);
  const isUser = user?.username === article.author.username;
const deleteArticle = async () => {
  const token = user?.token;
  try {
    const response = await fetch(
      `https://realworld.habsida.net/api/articles/${slug}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json(); 
      console.log("SERVER ERROR:", errorData);
      alert(JSON.stringify(errorData.errors, null, 2));
      return;
    }

    alert("Article deleted successfully!");
    navigate("/");
  } catch (err) {
    console.log(err);
    alert("Что-то пошло не так!");
  }
};

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
      {isUser && (
        <div className="article-btn-box">
          <button
            className="edit-article"
            onClick={() => navigate(`/articles/${slug}/edit`)}
          >
            Edit
          </button>
          <button
            className="delite-article"
            onClick={() => setShowConfirm(true)}
          >
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
      )}
    </div>
  );
};

export const BlogDetailsLoader = async ({ params }) => {
  const { slug } = params;
  const res = await fetch(`https://realworld.habsida.net/api/articles/${slug}`);
  const data = await res.json();
  return data.article;
};

export default BlogDetails;
