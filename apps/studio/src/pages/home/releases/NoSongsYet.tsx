import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

import { useFlags } from "launchdarkly-react-client-sdk";

import { Box, Stack, Table, Typography } from "@mui/material";

import { NEWMMonsterGuitar } from "@newm-web/assets";
import { getImageSrc } from "@newm-web/utils";
import { Button, HorizontalLine } from "@newm-web/elements";
import theme from "@newm-web/theme";

import TableHead from "./Table/TableHead";

const NoSongsYet: FunctionComponent = () => {
  // TODO(webStudioAlbumPhaseTwo): Remove flag once flag is retired.
  const { webStudioAlbumPhaseTwo } = useFlags();

  const navigate = useNavigate();

  return (
    <Stack
      sx={ {
        alignItems: "center",
        textAlign: "center",
      } }
    >
      { webStudioAlbumPhaseTwo ? (
        <>
          <HorizontalLine sx={ { mb: 5.5, mt: 0.5 } } />

          <Box
            alt="NEWM Monster"
            component="img"
            src={ getImageSrc(NEWMMonsterGuitar) }
            sx={ {
              height: { md: 176, sm: 176, xs: 176 },
              maxWidth: "100%",
              width: { md: 176, sm: 176, xs: 176 },
            } }
          />
          <Typography
            sx={ {
              color: theme.colors.music,
              fontFamily: theme.typography.emphasized,
              fontSize: "48px",
              mb: 1,
              mt: -1.5,
            } }
            variant="h2"
          >
            Take Your Music Global
          </Typography>
          <Typography
            sx={ { color: theme.colors.grey100, fontSize: 16, fontWeight: 300 } }
          >
            Manage your releases from initial upload through global
            distribution.
          </Typography>
          <Typography
            sx={ {
              color: theme.colors.white,
              fontSize: 16,
              fontWeight: 300,
              mt: 0.5,
            } }
          >
            Click the <strong>Create New Release</strong> button above to begin.
          </Typography>
        </>
      ) : (
        <>
          <Table>
            <TableHead />
          </Table>
          <Typography
            sx={ { color: theme.colors.white, mb: 1.5, mt: [3, 3, 5] } }
            variant="subtitle2"
          >
            You haven&apos;t uploaded any songs yet!
          </Typography>
          <Button
            color="music"
            variant="secondary"
            width="compact"
            onClick={ () => navigate("/home/upload-song") }
          >
            Upload your first song
          </Button>

          <HorizontalLine sx={ { mt: [3, 3, 5] } } />
        </>
      ) }
    </Stack>
  );
};

export default NoSongsYet;
