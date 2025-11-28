import { Link } from "react-router-dom";
import Article from "./Article";
import { useNavigate } from "react-router-dom";

const Articles = ({ articles, setArticles }) => {
    const navigate = useNavigate();
  const handleLike = (slug) => {
    const updatedLike = articles.map((article) =>
      article.slug === slug
        ? { ...article, favoritesCount: article.favoritesCount + 1 }
        : article
    );
    setArticles(updatedLike);
   navigate("/")
  };
  return (
    <ul className="blog-list">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link to={`/articles/${article.slug}`}>
            <Article
            slug={article.slug}
              key={article.slug}
              author={article.author.username}
              date={article.createdAt}
              likes={article.favoritesCount}
              title={article.title}
              description={article.description}
              tags={article.tagList}
              handleLike={handleLike}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Articles;
