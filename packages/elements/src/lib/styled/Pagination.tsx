import { Pagination, PaginationProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "@newm-web/theme";

const StyledPagination = styled(Pagination)<PaginationProps>({
  "& .MuiPaginationItem-ellipsis": {
    paddingBottom: "4px",
    paddingTop: "4px",
  },

  "& .MuiPaginationItem-previousNext": {
    borderRadius: "0px 6px 6px 0px",
  },
  "& .MuiPaginationItem-previousNext > svg": {
    color: theme.colors.grey100,
  },
  "& .MuiPaginationItem-root": {
    "&:hover": {
      background: theme.colors.grey400,
    },
    border: `1px solid ${theme.colors.grey400}`,
    borderRadius: "0px",
    color: theme.colors.grey100,
    margin: "0px",
    minHeight: "38px",
    minWidth: "42px",
  },
  "& .MuiPaginationItem-root.Mui-selected": {
    "&:hover": {
      background: theme.colors.grey400,
    },
    backgroundColor: theme.colors.grey400,
    color: "white",
  },

  "& li:first-of-type > button": {
    borderRadius: "6px 0px 0px 6px",
  },

  color: theme.colors.grey100,
});

export default StyledPagination;
