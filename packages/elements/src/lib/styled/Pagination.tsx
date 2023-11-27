import { Pagination, PaginationProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "newm-theme";

const StyledPagination = styled(Pagination)<PaginationProps>({
  color: theme.colors.grey100,

  "& .MuiPaginationItem-root": {
    minHeight: "38px",
    minWidth: "42px",
    color: theme.colors.grey100,
    borderRadius: "0px",
    border: `1px solid ${theme.colors.grey400}`,
    margin: "0px",
    "&:hover": {
      background: theme.colors.grey400,
    },
  },
  "& .MuiPaginationItem-previousNext > svg": {
    color: theme.colors.grey100,
  },
  "& .MuiPaginationItem-previousNext": {
    borderRadius: "0px 6px 6px 0px",
  },
  "& li:first-of-type > button": {
    borderRadius: "6px 0px 0px 6px",
  },

  "& .MuiPaginationItem-ellipsis": {
    paddingTop: "4px",
    paddingBottom: "4px",
  },

  "& .MuiPaginationItem-root.Mui-selected": {
    color: "white",
    backgroundColor: theme.colors.grey400,
    "&:hover": {
      background: theme.colors.grey400,
    },
  },
});

export default StyledPagination;
