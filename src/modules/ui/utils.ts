import { enableCountdown, projectDetails } from "buildParams";

export const getShouldDisplayCountdown = () => {
  const currentDate = new Date();
  const launchDate = new Date(projectDetails.launchTimestamp);

  return enableCountdown && launchDate > currentDate;
};
