import { Link } from "react-router-dom";
import Blog from "./Article";
import { useEffect, useState } from "react";

const Articles = ({ articles }) => {
  return (
    <ul className="blog-list">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link to={`/${article.slug}`}>
            <Blog
              key={article.slug}
              author={article.author.username}
              date={article.createdAt}
              likes={article.favoritesCount}
              title={article.title}
              description={article.description}
              tags={article.tagList}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Articles;
