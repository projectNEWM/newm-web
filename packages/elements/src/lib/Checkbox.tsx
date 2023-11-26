import {
  ForwardRefRenderFunction,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from 'react';
import theme from 'newm-theme';
import {
  Box,
  Checkbox as MUICheckbox,
  CheckboxProps as MUICheckboxProps,
  Stack,
  Typography,
} from '@mui/material';
import CheckboxIcon from './assets/images/CheckboxIcon';
import ErrorMessage from './styled/ErrorMessage';

export interface CheckboxProps extends MUICheckboxProps {
  readonly ariaDescribedBy?: string;
  readonly errorMessage?: string;
  readonly label?: string | ReactNode;
}

const Checkbox: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  { ariaDescribedBy, checked, sx, errorMessage, label, ...rest },
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <Stack direction="row" gap={1.5} alignItems="flex-start">
      <MUICheckbox
        aria-describedby={ariaDescribedBy}
        checked={checked}
        inputRef={ref}
        icon={
          <Box
            sx={{
              border: `2px solid ${theme.colors.grey400}`,
              borderRadius: '2px',
              height: '20px',
              width: '20px',
            }}
          />
        }
        checkedIcon={<CheckboxIcon />}
        sx={{
          '&.MuiCheckbox-root': {
            backgroundColor: theme.colors.grey600,
            borderRadius: '2px',
            minHeight: '20px',
            minWidth: '20px',
            overflow: 'hidden',
            p: 0,
          },

          '&.Mui-checked': {
            backgroundColor: theme.colors.music,
          },

          ...sx,
        }}
        {...rest}
      />

      <Stack direction="column">
        {typeof label === 'string' ? (
          <Typography
            variant="subtitle1"
            sx={{ color: theme.colors.white, fontSize: 12 }}
          >
            {label}
          </Typography>
        ) : (
          label
        )}

        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Stack>
    </Stack>
  );
};

export default forwardRef(Checkbox);
