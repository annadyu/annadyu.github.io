import { NavLink, useLoaderData, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const navigate = useNavigate();
  const article = useLoaderData();
  const { slug } = useParams();

  return (
    <div className="blog-details">
      <div className="details-info">
        <h2 className="details-title">{article.title}</h2>
        <h5 className="details-author"> author: {article.author.username}</h5>
        <p className="details-description">{article.description}</p>
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
      <div className="article-btn-box">
        <button className="delite-article">Delite</button>
        <button
          className="edit-article"
          onClick={() => navigate(`/articles/${slug}/edit`)}
        >
          Edit
        </button>
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
