import { TableHead as MUITableHead, TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";

const StyledHeaderCell = styled(TableCell)({
  borderBottom: `1px solid ${theme.colors.grey500}`,
  color: theme.colors.grey100,
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "17px",
  paddingBottom: "16px",
  paddingLeft: "24px",
  paddingTop: "16px",
});

const TableHead = () => {
  return (
    <MUITableHead>
      <TableRow>
        <StyledHeaderCell>SONG NAME</StyledHeaderCell>
        <StyledHeaderCell sx={ { display: { xs: "none", sm: "table-cell" } } }>
          MINTING
        </StyledHeaderCell>
        <StyledHeaderCell sx={ { display: { xs: "none", lg: "table-cell" } } }>
          GENRE
        </StyledHeaderCell>
        <StyledHeaderCell
          sx={ {
            textAlign: "end",
            display: { xs: "none", md: "table-cell" },
          } }
        >
          LENGTH
        </StyledHeaderCell>
      </TableRow>
    </MUITableHead>
  );
};

export default TableHead;
