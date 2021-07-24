import React, { FunctionComponent } from "react";

import { userTypes } from "config/contants";
import ClientAccount from "./client";
import CompanyAccount from "./company";
import ProfessionalAccount from "./professional";
import { useLocation } from "react-router-dom";

interface props {}

const Account: FunctionComponent<props> = () => {
  const location: any = useLocation();

  if (location.state === userTypes.client) {
    return <ClientAccount />;
  } else if (location.state === userTypes.company) {
    return <CompanyAccount />;
  } else if (location.state === userTypes.professional) {
    return <ProfessionalAccount />;
  } else {
    return <ClientAccount />;
  }
};

export default Account;
