import sessionApi from "./api";

export const sendVerificationEmail = (email: string) => {
  return sessionApi.endpoints.sendVerificationEmail.initiate({ email });
};
