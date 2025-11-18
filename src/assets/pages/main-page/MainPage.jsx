import VideoNavigation from "./VideoNavigation.jsx";
import Header from "./Header.jsx";
import HeaderNav from "./HeaderNav.jsx";
import Articles from "./Articles.jsx";
import Blog from "./Article.jsx";
import Pagination from "./pagination.jsx";
import ProfileEditing from "../ProfileEditing.jsx";

const MainPage = ({
  savedEmail,
  savedPassword,
  savedUsername,
  savedAvatar,
  articles,
  totalArticles,
  articlesPerPage,
  currentPage,
  setCurrentPage,
  currentArticle,
  paginate,
}) => {
  return (
    <>
      <header>
        <Header savedAvatar={savedAvatar} savedUsername={savedUsername} />
      </header>
      <main>
        <VideoNavigation />
        <Articles articles={articles} />
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
