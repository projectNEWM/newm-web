import { enableCountdown, projectDetails } from "buildParams";

export const getShouldDisplayCountdown = () => {
  const currentDate = new Date();
  const launchDate = new Date(projectDetails.launchDate);

  return enableCountdown && launchDate > currentDate;
};
