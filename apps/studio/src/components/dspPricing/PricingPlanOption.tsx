import { Check, Close } from "@mui/icons-material";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Button } from "@newm-web/elements";
import { JSX } from "react";
import theme from "@newm-web/theme";
import { pricingPlanData } from "../../assets";
import { PricingPlanDetails } from "../../common";

interface PricingPlanOptionProps extends PricingPlanDetails {
  readonly adaPricingEstimate?: string;
  readonly planIcon: { iconPxSize: string; iconElement: JSX.Element };
  readonly onOptionClick: () => void;
  readonly hasOptionBeenSelected: boolean;
}

const PricingPlanOption = ({
  isActive,
  adaPricingEstimate,
  planIcon: { iconPxSize, iconElement },
  title,
  pricing,
  originalPricing,
  description,
  criteria,
  buttonText,
  buttonType,
  onOptionClick,
  hasOptionBeenSelected,
}: PricingPlanOptionProps) => {
  const criterionIcon = (includedInPlan: boolean) => {
    if (includedInPlan) {
      return <Check sx={{ color: theme.colors.green, fontSize: iconPxSize }} />;
    }
    return <Close sx={{ color: theme.colors.red, fontSize: iconPxSize }} />;
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.colors.grey600,
        border: `1px solid ${theme.colors.grey400}`,
        borderRadius: "12px",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        opacity: isActive ? 1 : 0.5,
        padding: 5,
        position: "relative",
        justifyContent: "center",
        height: "100%",
        [theme.breakpoints.down("xl")]: { paddingX: 2 },
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.colors.black,
          border: `2px solid ${theme.colors.grey500}`,
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          left: `calc(50% - ${iconPxSize})`,
          padding: 1.25,
          position: "absolute",
          top: `-${iconPxSize}`,
        }}
      >
        {iconElement}
      </Box>

      <Stack
        sx={{
          alignItems: "center",
          display: "flex",
          gap: 4,
          flex: 1,
        }}
      >
        <Stack textAlign="center">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              pb: 2,
              height: "40px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              {originalPricing && (
                <Box
                  component="span"
                  sx={{ textDecoration: "line-through", mr: 1 }}
                >
                  {originalPricing}
                </Box>
              )}

              {pricing === "Coming soon" ? (
                <Box
                  component="span"
                  sx={{
                    background: theme.colors.lightGreen,
                    borderRadius: "12px",
                    color: theme.colors.green,
                    fontSize: "14px",
                    fontWeight: 500,
                    px: 1.5,
                    py: 0.5,
                  }}
                >
                  {pricing}
                </Box>
              ) : (
                pricing
              )}
            </Box>
            <Typography variant="subtitle1">{adaPricingEstimate}</Typography>
          </Typography>
          <Typography variant="h2">{title}</Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              [theme.breakpoints.up("lg")]: { height: "48px" },
            }}
          >
            {description}
          </Typography>
        </Stack>

        <Stack gap={1.25}>
          {criteria.map((criterion, index) => (
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1.5,
                [theme.breakpoints.down("xl")]: { paddingX: 3 },
              }}
              key={index}
            >
              {criterionIcon(criterion.isIncludedInPlan)}
              <Typography variant="body1" fontWeight={500}>
                {
                  pricingPlanData.sharedCriterionText[
                    criterion.criterionText as keyof typeof pricingPlanData.sharedCriterionText
                  ]
                }
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Divider sx={{ width: "70%" }} color={theme.colors.grey400} />

        {buttonType === "primary" ? (
          <Button onClick={onOptionClick} isLoading={hasOptionBeenSelected}>
            {buttonText}
          </Button>
        ) : (
          <Button
            variant={"secondary"}
            color="music"
            disabled={!isActive || hasOptionBeenSelected}
            onClick={onOptionClick}
          >
            {buttonText}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default PricingPlanOption;
