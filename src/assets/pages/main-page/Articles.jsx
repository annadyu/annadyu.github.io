
import Article from "./Article";
import { LoginUser } from "../Zustand";

const Articles = ({ articles, setArticles }) => {
  const { user } = LoginUser();
  const handleLike = async (slug) => {
    const token = user?.token;
    try {
      const response = await fetch(
        `https://realworld.habsida.net/api/articles/${slug}/favorite`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Что-то пошло не так!");
      }
      const data = await response.json();
       const updatedArticle = data.article;

    setArticles((prev) =>
      prev.map((art) =>
        art.slug === slug ? { ...art, ...updatedArticle } : art
      )
    );
      console.log("Лайк успешно поставлен:", data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ul className="blog-list">
      {articles.map((article) => (
        <li key={article.slug}>
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
        </li>
      ))}
    </ul>
  );
};

export default Articles;
