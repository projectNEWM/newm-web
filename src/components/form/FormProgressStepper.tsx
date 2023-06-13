import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Theme, styled } from "@mui/material";
import { Typography } from "elements";
import theme from "theme";

interface StepBoxProps {
  readonly boxColor: keyof Theme["colors"];
  readonly boxTitle: string;
}

interface FormStepperGridProps {
  readonly activeStep: number;
  readonly stepTitles: ReadonlyArray<string>;
}

const statusColor = (activeStep: number, currentIndex: number) => {
  const isStepCompleted = activeStep > currentIndex + 1;
  const isStepActive = activeStep === currentIndex + 1;

  if (isStepCompleted) {
    return "green";
  } else if (isStepActive) {
    return "music";
  } else {
    return "grey400";
  }
};

const StepBox = styled(Box)<StepBoxProps>`
  flex-grow: 1;
  color: ${(props) => theme.colors[props.boxColor]};
  background-color: ${theme.colors.black};
  border-bottom: 3px solid ${(props) => theme.colors[props.boxColor]};
  height: 59px;
  width: 232px;
  display: flex;
  align-items: center;
`;

const StepNumberIcon = styled(Box)`
  width: 20px;
  height: 20px;
  border: 2px solid;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
  font-size: 14px;
  margin: 2px;
`;

/**
 * Displays a grid of boxes with numbers and colors corresponding to the step
 * and state in a multi-step form.
 *
 * @param activeStep The current step in the form
 * @param stepTitles An array of step titles

 * @returns A grid of step boxes for a form
 */
const FormProgressStepper = ({
  activeStep,
  stepTitles,
}: FormStepperGridProps) => {
  return (
    <Box
      sx={ {
        display: "flex",
        flexDirection: ["column", "column", "row"],
        maxWidth: [undefined, undefined, "700px"],
        gap: 0.5,
        mb: 5,
        justifyContent: "center",
        alignItems: "center",
      } }
    >
      { stepTitles.map((stepTitle, index) => {
        const isStepCompleted = activeStep > index + 1;
        const stepColor = statusColor(activeStep, index);

        return (
          <StepBox
            key={ index }
            boxColor={ stepColor }
            boxTitle={ stepTitle }
            justifyContent={ ["center", "center", "flex-start"] }
          >
            <Box
              sx={ {
                display: "flex",
                flexDirection: "row",
                gap: 1.5,
                pl: 1.75,
              } }
            >
              { isStepCompleted ? (
                <CheckCircleOutline />
              ) : (
                <StepNumberIcon> { index + 1 }</StepNumberIcon>
              ) }
              <Typography
                variant="subtitle2"
                color={ stepColor }
                sx={ {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                } }
              >
                { stepTitle }
              </Typography>
            </Box>
          </StepBox>
        );
      }) }
    </Box>
  );
};

export default FormProgressStepper;
