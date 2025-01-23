import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { mockUser } from "../api/mock-data";
import { AuthContext } from "../contexts/auth.context";
import { AvatarCreatePage } from "../pages/avatar-create.page";
import { AvatarResultsPage } from "../pages/avatar-results.page";
import { LearnPage } from "../pages/learn.page";
import { PersonalPage } from "../pages/personal.page";
import { SignupPage } from "../pages/signup.page";
import { TeamPage } from "../pages/team.page";

export const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </>
      ) : (
        <>
          {!mockUser.hasAvatar ? (
            <>
              <Route path="/avatar-create" element={<AvatarCreatePage />} />
              <Route path="*" element={<Navigate to="/avatar-create" replace />} />
            </>
          ) : (
            <>
              <Route path="/avatar-results" element={<AvatarResultsPage />} />
              <Route path="/personal" element={<PersonalPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="*" element={<Navigate to="/avatar-results" replace />} />
            </>
          )}
        </>
      )}
    </Routes>
  );
};
