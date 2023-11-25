import { Stack } from "@mui/material";
import Typography from "../Typography";

export default {
  title: "Typography",
  component: Typography,
};

export const Variants = () => (
  <Stack mt={ 2 } direction="column" spacing={ 2 }>
    <Typography variant="h1">h1</Typography>
    <Typography variant="h3">h3</Typography>
    <Typography variant="h4">h4</Typography>
    <Typography variant="h5">h5</Typography>
    <Typography variant="h6">h6</Typography>
    <Typography variant="body1">Body 1</Typography>
  </Stack>
);

export const FontWeights = () => (
  <Stack mt={ 2 } direction="column" spacing={ 2 }>
    <Typography variant="h4" fontWeight={ 400 }>
      Text Regular Font Weight
    </Typography>
    <Typography variant="h4" fontWeight={ 500 }>
      Text Medium Font Weight
    </Typography>
    <Typography variant="h4" fontWeight={ 600 }>
      Text Semi Bold Font Weight
    </Typography>
    <Typography variant="h4" fontWeight={ 700 }>
      Text Bold Font Weight
    </Typography>
    <Typography variant="h4" fontWeight={ 800 }>
      Text Extra Bold Font Weight
    </Typography>
  </Stack>
);

export const FontFamilies = () => (
  <Stack mt={ 2 } direction="column" spacing={ 2 }>
    <Typography variant="h4" fontFamily="Inter">
      Text Inter
    </Typography>
    <Typography variant="h4" fontFamily="Raleway">
      Text Raleway
    </Typography>
    <Typography variant="h4" fontFamily="DM Serif Text">
      Text DM Serif Text
    </Typography>
    <Typography variant="h4" fontStyle="italic" fontFamily="DM Serif Text">
      Text DM Serif Text Italic
    </Typography>
  </Stack>
);
