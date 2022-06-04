import { Pagination, PaginationProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";

const grey100 = theme.colors.grey100;

const StyledPagination = styled(Pagination)<PaginationProps>({
  color: grey100,

  "& .MuiPaginationItem-root": {
    color: grey100,
    borderRadius: "0px",
    border: `1px solid ${grey100}`,
    margin: "0px",
  },
  "& .MuiPaginationItem-previousNext > svg": {
    color: grey100,
  },
  "& .MuiPaginationItem-previousNext": {
    borderRadius: "0px 6px 6px 0px",
  },
  "& li:first-child > button": {
    borderRadius: "6px 0px 0px 6px",
  },

  "& .MuiPaginationItem-ellipsis": {
    paddingTop: "4px",
    paddingBottom: "4px",
  },

  "& .Mui-selected": {
    color: "white",
    background: theme.colors.grey400,
  },
});

export default StyledPagination;
