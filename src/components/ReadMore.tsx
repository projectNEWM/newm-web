import { Box, useTheme } from "@mui/material";
import { Typography } from "elements";
import { FunctionComponent, ReactNode, useState } from "react";

interface ReadMoreProps {
  readonly abbreviatedContent: ReactNode;
  readonly expandedContent: ReactNode;
}

const ReadMore: FunctionComponent<ReadMoreProps> = ({
  abbreviatedContent,
  expandedContent,
}) => {
  const theme = useTheme();

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      sx={ {
        display: "flex",
        flexDirection: "column",
      } }
    >
      { isExpanded ? expandedContent : abbreviatedContent }

      { !isExpanded && (
        <Box
          sx={ {
            display: "flex",
            flexShrink: 1,
            marginTop: 1,
            paddingX: 1,
            alignSelf: "flex-start",
            backgroundColor: theme.colors.grey400,
            cursor: "pointer",
          } }
        >
          <Typography
            variant="subtitle2"
            color="white"
            onClick={ () => setIsExpanded(true) }
          >
            Read more
          </Typography>
        </Box>
      ) }
    </Box>
  );
};

export default ReadMore;
