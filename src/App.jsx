import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

//pages

import MainPage from "./assets/pages/main-page/MainPage.jsx";
import VideoNavigation from "./assets/pages/main-page/VideoNavigation.jsx";
import Header from "./assets/pages/main-page/Header.jsx";
import HeaderNav from "./assets/pages/main-page/HeaderNav.jsx";
import Articles from "./assets/pages/main-page/Articles.jsx";
import Article from "./assets/pages/main-page/Article.jsx";
import BlogDetails from "./assets/pages/BlogDetails.jsx";
import NotFound from "./assets/pages/NotFound.jsx";
import Pagination from "./assets/pages/main-page/pagination.jsx";
import SignUp from "./assets/pages/login pages/SignUp.jsx";
import SignIn from "./assets/pages/login pages/SignIn.jsx";
import ProfileEditing from "./assets/pages/ProfileEditing.jsx";
import CreateNewArticle from "./assets/pages/CreateNewArticle.jsx";
import PageEditing from "./assets/pages/PageEditing.jsx";

//roots
import RootLayout from "./layouts/RootLayout.jsx";
import { BlogDetailsLoader } from "./assets/pages/BlogDetails.jsx";
import LogInLayout from "./layouts/LogInLayout.jsx";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(4);
  const [totalArticles, setTotalArticles] = useState(0);

  // const lastArticleIndex = currentPage * articlesPerPage;
  // const firstArticleIndex = lastArticleIndex - articlesPerPage;
  // const currentArticle = articles.slice(firstArticleIndex, lastArticleIndex);

  // const tasksLeft = tasks.filter((el) => !el.completed).length;

  const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
  const savedUsername = savedUser?.username;
  const savedEmail = savedUser?.email;
  const savedPassword = savedUser?.password;
  const savedAvatar = savedUser?.avatar;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTE1LCJleHAiOjE3NjM2MDU2Njh9.i3Xq9zDmBh9AsuW_cBc8bBGGyxt4z5Lsq7a8s2lBddc";

  useEffect(() => {
    setLoading(true);
    const offset = (currentPage - 1) * articlesPerPage;
    fetch(
      `https://realworld.habsida.net/api/articles?limit=${articlesPerPage}&offset=${offset}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
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

  if (loading) return <div> Loading articles...</div>;

  if (error)
    return (
      <div>
        <h1>Page not found!!</h1>
        <p>
          return to the <Link to="/">Homepage</Link>.
        </p>
      </div>
    );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <MainPage
              articles={articles}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              articlesPerPage={articlesPerPage}
              savedUsername={savedUsername}
              savedAvatar={savedAvatar}
            />
          }
        />
        <Route path="login" element={<LogInLayout />}>
          <Route
            path="sign-in"
            element={
              <SignIn
                savedUser={savedUser}
                savedEmail={savedEmail}
                savedPassword={savedPassword}
              />
            }
          />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route
          path="/new-article"
          element={<CreateNewArticle
          setArticles={setArticles}
          articles={articles}
          />}
        />
        <Route
          path=":slug"
          element={<BlogDetails />}
          loader={BlogDetailsLoader}
          errorElement={<NotFound />}
        />
        <Route path="profile" element={<ProfileEditing />} />
       <Route path="/articles/:slug/edit" element={<PageEditing 
        setArticles={setArticles}
          articles={articles}
       />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
