import { Stack } from "@mui/material";
import { TransparentButton } from "elements";
import { FunctionComponent } from "react";

interface SelectWalletItemProps {
  readonly name: string;
  readonly logo: string;
  readonly onClick: VoidFunction;
}

const SelectWalletItem: FunctionComponent<SelectWalletItemProps> = ({
  name,
  logo,
  onClick,
}) => {
  return (
    <TransparentButton
      key={ name }
      onClick={ onClick }
      sx={ { opacity: 1, justifyContent: "flex-start" } }
    >
      <Stack
        direction="row"
        spacing={ 2 }
        justifyContent="flex-start"
        alignItems="center"
      >
        <img alt={ `${name} logo` } src={ logo } width={ 30 } height={ 30 } />
        <span>{ name }</span>
      </Stack>
    </TransparentButton>
  );
};

export default SelectWalletItem;
