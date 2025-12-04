import { Link } from "react-router-dom";
import Article from "./Article";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../Zustand";

const Articles = ({ articles }) => {
    const navigate = useNavigate();
    const { user } = LoginUser();
  const handleLike = async (slug) => {
     const token = user?.token;
     try {
      const response = await fetch(
        `https://realworld.habsida.net/api/articles/${slug}/favorite`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Что-то пошло не так!");
      }
      const data = await response.json();
       console.log("Лайк успешно поставлен:", data);
       navigate("/")
    } catch (error) {
      console.log(error);
    }
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
