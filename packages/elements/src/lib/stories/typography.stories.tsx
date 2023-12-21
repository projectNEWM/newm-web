import { Stack } from "@mui/material";
import Typography from "../Typography";

export default {
  component: Typography,
  title: "Typography",
};

export const Variants = () => (
  <Stack direction="column" mt={ 2 } spacing={ 2 }>
    <Typography variant="h1">h1</Typography>
    <Typography variant="h3">h3</Typography>
    <Typography variant="h4">h4</Typography>
    <Typography variant="h5">h5</Typography>
    <Typography variant="h6">h6</Typography>
    <Typography variant="body1">Body 1</Typography>
  </Stack>
);

export const FontWeights = () => (
  <Stack direction="column" mt={ 2 } spacing={ 2 }>
    <Typography fontWeight={ 400 } variant="h4">
      Text Regular Font Weight
    </Typography>
    <Typography fontWeight={ 500 } variant="h4">
      Text Medium Font Weight
    </Typography>
    <Typography fontWeight={ 600 } variant="h4">
      Text Semi Bold Font Weight
    </Typography>
    <Typography fontWeight={ 700 } variant="h4">
      Text Bold Font Weight
    </Typography>
    <Typography fontWeight={ 800 } variant="h4">
      Text Extra Bold Font Weight
    </Typography>
  </Stack>
);

export const FontFamilies = () => (
  <Stack direction="column" mt={ 2 } spacing={ 2 }>
    <Typography fontFamily="Inter" variant="h4">
      Text Inter
    </Typography>
    <Typography fontFamily="Raleway" variant="h4">
      Text Raleway
    </Typography>
    <Typography fontFamily="DM Serif Text" variant="h4">
      Text DM Serif Text
    </Typography>
    <Typography fontFamily="DM Serif Text" fontStyle="italic" variant="h4">
      Text DM Serif Text Italic
    </Typography>
  </Stack>
);
