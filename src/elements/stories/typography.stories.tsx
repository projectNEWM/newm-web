import { Stack } from "@mui/material";
import Typography from "../Typography";

export default {
  title: "Typography",
  component: Typography,
};

export const Variants = () => (
  <Stack mt={ 2 } direction="column" spacing={ 2 }>
    <Typography variant="xxs">Text xxs</Typography>
    <Typography variant="xs">Text xs</Typography>
    <Typography variant="sm">Text sm</Typography>
    <Typography variant="md">Text md</Typography>
    <Typography variant="xxl">Text xxl</Typography>
  </Stack>
);

export const FontWeights = () => (
  <Stack mt={ 2 } direction="column" spacing={ 2 }>
    <Typography variant="md" fontWeight="regular">
      Text Regular Font Weight
    </Typography>
    <Typography variant="md" fontWeight="medium">
      Text Medium Font Weight
    </Typography>
    <Typography variant="md" fontWeight="semi-bold">
      Text Semi Bold Font Weight
    </Typography>
    <Typography variant="md" fontWeight="bold">
      Text Bold Font Weight
    </Typography>
    <Typography variant="md" fontWeight="extra-bold">
      Text Extra Bold Font Weight
    </Typography>
  </Stack>
);

export const FontFamilies = () => (
  <Stack mt={ 2 } direction="column" spacing={ 2 }>
    <Typography variant="md" fontFamily="Inter">
      Text Inter
    </Typography>
    <Typography variant="md" fontFamily="Raleway">
      Text Raleway
    </Typography>
    <Typography variant="md" fontFamily="DM Serif Text">
      Text DM Serif Text
    </Typography>
    <Typography variant="md" fontStyle="italic" fontFamily="DM Serif Text">
      Text DM Serif Text Italic
    </Typography>
  </Stack>
);
