import { TableCell as MUITableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "@newm-web/theme";

const TableCell = styled(MUITableCell)({
  borderBottom: `1px solid ${theme.colors.grey500}`,
  borderTop: `1px solid ${theme.colors.grey500}`,
  color: theme.colors.white,
  fontFamily: "Inter",

  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "20px",
  paddingBottom: "10px",
  paddingTop: "10px",
});

export default TableCell;
