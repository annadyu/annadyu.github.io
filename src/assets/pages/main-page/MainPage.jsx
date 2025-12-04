import VideoNavigation from "./VideoNavigation.jsx";
import Header from "./Header.jsx";
import Articles from "./Articles.jsx";
import Article from "./Article.jsx";
import Pagination from "./pagination.jsx";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(7);
  const [totalArticles, setTotalArticles] = useState(0);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setLoading(true);

    const offset = currentPage === 1 ? 0 : (currentPage - 1) * articlesPerPage;
    fetch(
      `https://realworld.habsida.net/api/articles?limit=${articlesPerPage}&offset=${offset}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("ошибка");
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles);
        setTotalArticles(data.articlesCount);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [currentPage]);
  if (loading)
    return (
      <div className="loading-container">
        <img className="loading-mg" src="./refresh.svg" alt="" />
        <div className="loading">Loading articles...</div>
      </div>
    );

  if (error)
    return (
      <div>
        <h1>Page not found!!</h1>
        <p>
          return to the <Link to="/">Homepage</Link>.
        </p>
      </div>
    );

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <VideoNavigation />
        <Articles articles={articles} setArticles={setArticles} />
      </main>
      <footer>
        <Pagination
          articlesPerPage={articlesPerPage}
          totalArticles={totalArticles}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginate={paginate}
        />
      </footer>
    </>
  );
};

export default MainPage;
