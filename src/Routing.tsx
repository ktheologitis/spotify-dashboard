import { Route, Routes } from "react-router-dom";
import Authorized from "./components/Authorized/Authorized";
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
          index
          element={
            <Authorized>
              <RecommendationsPage />
            </Authorized>
          }
        />
        <Route
          path="/filter"
          element={
            <Authorized>
              <FilterPage />
            </Authorized>
          }
        />
        <Route
          path="/authorize"
          element={<AuthorizationPage />}
        />
        <Route
          path="/authorize/callback"
          element={<AuthorizationCallBackPage />}
        />
      </Route>
    </Routes>
  );
};

export default Routing;
