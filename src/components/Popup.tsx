import { Dialog, DialogContent } from "@mui/material";
import { keyframes, styled } from "@mui/material/styles";

interface PopupProps {
  children: React.ReactNode;
  openPopup: boolean;
  setOpenPopup: (open: boolean) => void;
  width?: string;
  height: string;
}

export const Popup = (props: PopupProps) => {
  const { children, openPopup, width, height } = props;

  return (
    <Dialog open={ openPopup } maxWidth={ false }>
      <StyledDialogContent
        sx={ {
          height: height,
          paddingLeft: "0px",
          paddingRight: "0px",
          paddingTop: "30px",
          width: width,
        } }
        dividers
      >
        { children }
      </StyledDialogContent>
    </Dialog>
  );
};

const StyledDialogContent = styled(DialogContent)(() => ({
  animation: `10s ${rotate} linear infinite;`,
  border: "1.5px solid transparent;",
  borderImage: "conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1;",
  borderImageSlice: " 1;",
}));

// --angle property defined in app.css
const rotate = keyframes`
  to {
    --angle: 360deg; 
  }
}
`;
