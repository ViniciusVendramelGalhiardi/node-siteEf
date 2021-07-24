import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "components/protectedRoute";
import Home from "pages/home";
import ProfessionalRegistration from "pages/registrations/professional";
import CompanyRegistration from "pages/registrations/company";
import ForProfessional from "pages/for/professional";
import ForCompany from "pages/for/company";
import CompanyProfile from "pages/profiles/company";
import ProfessionalProfile from "pages/profiles/professional";
import Account from "pages/accounts";
import VideoCall from "pages/videoCall";
import EvaluateService from "pages/evaluateService";

const RoutesWrapper: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/para-profissionais" element={<ForProfessional />} />
      <Route path="/para-empresas" element={<ForCompany />} />
      <Route
        path="/cadastro-profissionais"
        element={<ProfessionalRegistration />}
      />
      <Route path="/cadastro-empresas" element={<CompanyRegistration />} />
      <Route path="/perfil-empresa/:id" element={<CompanyProfile />} />
      <Route
        path="/perfil-profissional/:id"
        element={<ProfessionalProfile />}
      />
      <ProtectedRoute path="/minha-conta" element={<Account />} />
      <ProtectedRoute path="/atendimento-online" element={<VideoCall />} />
      <ProtectedRoute
        path="/avaliar-atendimento"
        element={<EvaluateService />}
      />
    </Routes>
  );
};

export default RoutesWrapper;
