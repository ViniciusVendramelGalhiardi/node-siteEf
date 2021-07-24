export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const isProduction = process.env.REACT_APP_ENVIRONMENT === "production";

export const host = window.location.protocol + "//" + window.location.host;

export const userTypes: any = {
  client: 1,
  professional: 2,
  company: 3,
};

export const schedulingStatus = {
  unscheduled: 0,
  scheduled: 1,
};
