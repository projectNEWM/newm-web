import { Box } from "@mui/material";
import { Typography } from "elements";
import { FunctionComponent, ReactNode, useState } from "react";

interface ReadMoreProps {
  readonly abbreviatedContent: string | ReactNode;
  readonly expandedContent: string | ReactNode;
  readonly typographyVariant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "subtitle1"
    | "subtitle2";
}

/**
 * Displays abbreviated content with an option to expand and "read more".
 */
const ReadMore: FunctionComponent<ReadMoreProps> = ({
  abbreviatedContent,
  expandedContent,
  typographyVariant = "body1",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      sx={ {
        display: "flex",
        flexDirection: "column",
      } }
    >
      <Typography variant={ typographyVariant } sx={ { whiteSpace: "pre-wrap" } }>
        { isExpanded ? expandedContent : abbreviatedContent }{ " " }
        { !isExpanded && (
          <button
            onClick={ () => setIsExpanded(true) }
            style={ {
              color: "white",
              fontWeight: 600,
              whiteSpace: "nowrap",
              background: "none",
              borderWidth: 0,
              cursor: "pointer",
              textDecoration: "underline",
            } }
          >
            Read more
          </button>
        ) }
      </Typography>
    </Box>
  );
};

export default ReadMore;
