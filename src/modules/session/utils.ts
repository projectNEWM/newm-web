import sessionApi from "./api";

const sendVerificationEmail = (email: string) =>
  sessionApi.endpoints.sendVerificationEmail.initiate({ email });

export { sendVerificationEmail };
