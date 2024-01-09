import { Stack } from "@mui/material";
import { Button } from "@newm-web/elements";
import { FunctionComponent } from "react";

interface SelectWalletItemProps {
  readonly logo: string;
  readonly name: string;
  readonly onClick: VoidFunction;
}

const SelectWalletItem: FunctionComponent<SelectWalletItemProps> = ({
  name,
  logo,
  onClick,
}) => {
  return (
    <Button
      color="white"
      key={ name }
      sx={ { justifyContent: "flex-start", opacity: 1 } }
      variant="outlined"
      width="full"
      onClick={ onClick }
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="flex-start"
        spacing={ 2 }
      >
        <img alt={ `${name} logo` } height={ 30 } src={ logo } width={ 30 } />
        <span>{ name }</span>
      </Stack>
    </Button>
  );
};

export default SelectWalletItem;
