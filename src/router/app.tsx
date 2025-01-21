import { Route, Routes } from "react-router-dom";
import { AvatarCreatePage } from "../pages/avatar-create.page";
import { AvatarResultsPage } from "../pages/avatar-results.page";
import { HomePage } from "../pages/home.page";
import { LearnPage } from "../pages/learn.page";
import { PersonalPage } from "../pages/personal.page";
import { SignupPage } from "../pages/signup.page";
import { TeamPage } from "../pages/team.page";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/avatar-create" element={<AvatarCreatePage />} />
      <Route path="/avatar-results" element={<AvatarResultsPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/personal" element={<PersonalPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/learn" element={<LearnPage />} />
    </Routes>
  );
};
