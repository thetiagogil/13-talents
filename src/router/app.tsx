import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home.page";
import { LearnPage } from "../pages/learn.page";
import { PersonalPage } from "../pages/personal.page";
import { SignupPage } from "../pages/signup.page";
import { TeamPage } from "../pages/team.page";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/personal" element={<PersonalPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/learn" element={<LearnPage />} />
    </Routes>
  );
};
