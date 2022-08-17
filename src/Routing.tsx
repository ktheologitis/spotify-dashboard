import { Route, Routes } from "react-router-dom";
import AuthorizedUser from "./components/Authorized/AuthorizedUser";
import Layout from "./components/Layout/Layout";
import AuthorizationCallBackPage from "./pages/AuthorizationCallBackPage/AuthorizationCallBackPage";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizarionPage";
import FilterPage from "./pages/FilterPage/Filterpage";
import RecommendationsPage from "./pages/RecommendationsPage/RecommendationPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/authorize"
          element={<AuthorizationPage />}
        />
        <Route
          path="/authorize/callback"
          element={<AuthorizationCallBackPage />}
        />
        <Route
          path="/recommendations"
          element={
            <AuthorizedUser>
              <RecommendationsPage />
            </AuthorizedUser>
          }
        />
        <Route
          path="/filter"
          element={
            <AuthorizedUser>
              <FilterPage />
            </AuthorizedUser>
          }
        />
      </Route>
    </Routes>
  );
};

export default Routing;
