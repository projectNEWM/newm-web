import { FunctionComponent } from "react";
import { TransparentButton } from "elements";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Stack } from "@mui/material";

interface SideBarButtonProps {
  readonly label: string;
  readonly icon: JSX.Element;
  readonly to: string;
  readonly closeMenu?: VoidFunction;
}

const SideBarButton: FunctionComponent<SideBarButtonProps> = ({
  label,
  icon,
  to,
  closeMenu,
  ...rest
}) => {
  const resolved = useResolvedPath(to);
  const match = useMatch(resolved.pathname);

  return (
    <Link to={ to } style={ { textDecoration: "none" } }>
      <TransparentButton
        key={ label }
        active={ !!match }
        onClick={ closeMenu }
        fullWidth={ true }
        sx={ {
          alignItems: "center",
          justifyContent: "flex-start",
        } }
        { ...rest }
      >
        <Stack direction="row" spacing={ 2.5 }>
          { icon }
          <span>{ label }</span>
        </Stack>
      </TransparentButton>
    </Link>
  );
};

export default SideBarButton;
