import { styled } from "@mui/material/styles";

const ProfileImage = styled("img")(
  ({ height, theme, width }) => `
    border-radius: 50%;
    width: ${width || theme.spacing(16.25)};
    height: ${height || theme.spacing(16.25)};
    box-shadow: -2px 2px 6px rgba(0, 0, 0, 0.25);
  `
);

export default ProfileImage;
