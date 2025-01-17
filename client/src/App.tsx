import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import TeamManagement from "./pages/TeamManagement";
import Projects from "./pages/Projects";
import Recruitment from "./pages/Recruitment";
import Onboarding from "./pages/Onboarding";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import Settings from "./pages/Settings";
import Referrals from "./pages/Referrals";
import Sourcing from "./pages/Sourcing";
import AddReferral from "./pages/AddReferral";
import Documentation from "./pages/Documentation";
import Interviews from "./pages/Interviews";
import InterviewTemplate from "./pages/InterviewTemplate";
import Assessment from "./pages/Assessment";
import CandidateProfile from "./pages/CandidateProfile";
import Decision from "./pages/Decision";
import ScoreOverview from "./pages/ScoreOverview";

const { Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout style={{ marginLeft: 250 }}>
          <Header />
          <Content
            style={{
              margin: "24px 16px 0",
              padding: "24px",
              background: "#fff",
            }}
          >
            <Routes>
              <Route path="/dashboard" Component={Dashboard} />
              <Route path="/interviews" Component={Interviews} />
              <Route path="/documentation" Component={Documentation} />
              <Route path="/team-management" Component={TeamManagement} />
              <Route path="/projects" Component={Projects} />
              <Route path="/recruitment" Component={Recruitment} />
              <Route path="/onboarding" Component={Onboarding} />
              <Route
                path="/interviews/:templateId"
                Component={InterviewTemplate}
              />
              <Route path="/assessments/:candidateId" Component={Assessment} />
              <Route
                path="/candidates/:candidateId"
                Component={CandidateProfile}
              />
              <Route
                path="/score-overview/:candidateId"
                Component={ScoreOverview}
              />
              <Route path="/decision/:candidateId" Component={Decision} />
              <Route path="/reports-analytics" Component={ReportsAnalytics} />
              <Route path="/settings" Component={Settings} />
              <Route path="/referrals" Component={Referrals} />
              <Route path="/sourcing" Component={Sourcing} />
              <Route path="/add-referral/:team" Component={AddReferral} />
              <Route path="/" Component={Dashboard} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Team Hub ©2023 Created by Your Company
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
