import { Check, Close } from "@mui/icons-material";
import { Box, Divider, Stack } from "@mui/material";
import { Button, Typography } from "elements";
import { JSX } from "react";
import theme from "theme";

interface PricingPlanOptionProps {
  readonly planIcon: { size: number; icon: JSX.Element };
  readonly title: string;
  readonly pricing: string;
  readonly description: string;
  readonly criteria: Array<{
    includedInPlan: boolean;
    criterionText: string;
  }>;
  readonly buttonText: string;
  readonly buttonType: string;
}

const PricingPlanOption = ({
  planIcon,
  title,
  pricing,
  description,
  criteria,
  buttonText,
  buttonType,
}: PricingPlanOptionProps) => {
  const criterionIcon = (includedInPlan: boolean) => {
    if (includedInPlan) {
      return <Check sx={ { color: theme.colors.green } } />;
    }
    return <Close sx={ { color: theme.colors.red } } />;
  };

  return (
    <Box
      sx={ {
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${theme.colors.grey400}`,
        borderRadius: "12px",
        backgroundColor: theme.colors.grey600,
        position: "relative",
        padding: 5,
        flex: 1,
      } }
    >
      <Box
        sx={ {
          border: `1px solid ${theme.colors.grey500}`,
          borderRadius: "4px",
          padding: "8px",
          backgroundColor: theme.colors.black,
          position: "absolute",
          top: `-${planIcon.size}px`,
          left: `calc(50% - ${planIcon.size}px)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        } }
      >
        { planIcon.icon }
      </Box>

      <Stack textAlign="center">
        <Typography variant="h4" fontWeight={ 700 }>
          { pricing }
        </Typography>
        <Typography variant="h2">{ title }</Typography>
        <Typography variant="subtitle1" fontWeight={ 500 }>
          { description }
        </Typography>
      </Stack>

      <Stack>
        { criteria.map((criterion, index) => (
          <Stack sx={ { display: "flex", flexDirection: "row" } } key={ index }>
            { criterionIcon(criterion.includedInPlan) }
            <Typography>{ criterion.criterionText }</Typography>
          </Stack>
        )) }
      </Stack>
      <Divider />
      { buttonType === "primary" ? (
        <Button>{ buttonText }</Button>
      ) : (
        <Button variant={ "secondary" } color="music">
          { buttonText }
        </Button>
      ) }
    </Box>
  );
};

export default PricingPlanOption;
