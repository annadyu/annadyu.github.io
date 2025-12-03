import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

//pages

import MainPage from "./assets/pages/main-page/MainPage.jsx";
import BlogDetails from "./assets/pages/BlogDetails.jsx";
import NotFound from "./assets/pages/NotFound.jsx";
import SignUp from "./assets/pages/login pages/SignUp.jsx";
import SignIn from "./assets/pages/login pages/SignIn.jsx";
import ProfileEditing from "./assets/pages/ProfileEditing.jsx";
import CreateNewArticle from "./assets/pages/CreateNewArticle.jsx";
import PageEditing from "./assets/pages/PageEditing.jsx";

//roots
import RootLayout from "./layouts/RootLayout.jsx";
import { BlogDetailsLoader } from "./assets/pages/BlogDetails.jsx";
import PrivateRoute from "./layouts/PrivateRoute.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<MainPage />} />
        <Route path="articles" element={<MainPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>

       
          <Route
            path="/new-article"
            element={
              <CreateNewArticle  />
            }
          />
        
        <Route
          path="/articles/:slug"
          element={
            <BlogDetails  />
          }
          loader={BlogDetailsLoader}
          errorElement={<NotFound />}
        />
        <Route path="profile" element={<ProfileEditing />} />
        <Route path="/articles/:slug/edit" element={<PageEditing />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
