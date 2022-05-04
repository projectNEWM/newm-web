import { styled } from "@mui/material/styles";

const ProfileImage = styled("img")(
  ({ theme }) => `
  border-radius: 50%;
  width: ${theme.spacing(16.25)};
  height: ${theme.spacing(16.25)};
`
);

export default ProfileImage;
