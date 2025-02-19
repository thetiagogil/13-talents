import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import { LoadingPage } from "../pages/loading.page";
import { LoginPage } from "../pages/login.page";
import { PersonalPage } from "../pages/personal.page";
import { ProfileCreatePage } from "../pages/profile-create.page";
import { ProfileResultsPage } from "../pages/profile-results.page";
import { TeamPage } from "../pages/team.page";

export const App = () => {
  const { isAuthenticated, user, isLoadingContext } = useContext(AuthContext);
  const hasProfile = user?.avatar && user?.role;

  return (
    <>
      {isLoadingContext ? (
        <LoadingPage />
      ) : (
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              {user && !hasProfile ? (
                <>
                  <Route path="/profile-create" element={<ProfileCreatePage />} />
                  <Route path="*" element={<Navigate to="/profile-create" replace />} />
                </>
              ) : (
                <>
                  <Route path="/profile-results" element={<ProfileResultsPage />} />
                  <Route path="/personal" element={<PersonalPage />} />
                  <Route path="/team" element={<TeamPage />} />
                  {/*  <Route path="/learn" element={<LearnPage />} /> */}
                  <Route path="*" element={<Navigate to="/profile-results" replace />} />
                </>
              )}
            </>
          )}
        </Routes>
      )}
    </>
  );
};
