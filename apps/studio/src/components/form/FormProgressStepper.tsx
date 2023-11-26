import { CheckCircleOutline } from '@mui/icons-material';
import { Box, Typography, styled } from '@mui/material';
import theme from '@newm.io/theme';

interface StepBoxProps {
  readonly boxColor: string;
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
    return theme.colors.green;
  } else if (isStepActive) {
    return theme.colors.music;
  } else {
    return theme.colors.grey400;
  }
};

const StepBox = styled(Box)<StepBoxProps>`
  flex-grow: 1;
  color: ${(props) => props.boxColor};
  background-color: ${theme.colors.grey700};
  border-bottom: 3px solid ${(props) => props.boxColor};
  min-height: 60px;
  min-width: 232px;
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
      display="flex"
      flexDirection={['column', 'column', 'row']}
      maxWidth={[undefined, undefined, '700px']}
      gap={0.5}
      mb={5}
      justifyContent="center"
      alignItems="center"
    >
      {stepTitles.map((stepTitle, index) => {
        const isStepCompleted = activeStep > index + 1;
        const stepColor = statusColor(activeStep, index);

        return (
          <StepBox
            key={index}
            boxColor={stepColor}
            boxTitle={stepTitle}
            justifyContent={['center', 'center', 'flex-start']}
          >
            <Box display="flex" flexDirection="row" gap={1.5} pl={1.75}>
              {isStepCompleted ? (
                <CheckCircleOutline />
              ) : (
                <StepNumberIcon> {index + 1}</StepNumberIcon>
              )}
              <Typography
                variant="subtitle2"
                color={stepColor}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {stepTitle}
              </Typography>
            </Box>
          </StepBox>
        );
      })}
    </Box>
  );
};

export default FormProgressStepper;
