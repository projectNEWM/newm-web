import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Stack, Typography } from "@mui/material";
import {
  Button,
  DashedOutline,
  HorizontalLine,
  Link,
  Tooltip,
} from "@newm-web/elements";
import { FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AddOutlined } from "@mui/icons-material";
import ReleaseDeletionHelp from "../ReleaseDeletionHelp";

/**
 * * Shared page for creating a new release and viewing release details.
 */
const ReleaseDetails: FunctionComponent = () => {
  const navigate = useNavigate();
  const { releaseId } = useParams<"releaseId">();

  // TODO: Fetch release details.

  const addTrackPath = releaseId
    ? `/home/releases/${releaseId}/track/new`
    : "/home/releases/new/track/new";

  return (
    <>
      <Stack alignItems="center" direction="row" gap={ 2.5 }>
        <Button
          color="white"
          variant="outlined"
          width="icon"
          onClick={ () => navigate(-1) }
        >
          <ArrowBackIcon />
        </Button>

        <Typography variant="h3">
          { /* // TODO: Update with release title. */ }
          { releaseId ? "RELEASE DETAILS (release.title)" : "CREATE NEW RELEASE" }
        </Typography>

        { releaseId && (
          // TODO: Update with standalone delete button component.
          <Tooltip title={ <ReleaseDeletionHelp /> }>
            <Stack ml="auto">
              <Button
                color="white"
                disabled={ true }
                sx={ { marginLeft: "auto" } }
                variant="outlined"
                width="icon"
              >
                <DeleteIcon fontSize="small" sx={ { color: "white" } } />
              </Button>
            </Stack>
          </Tooltip>
        ) }
      </Stack>

      <Box
        pb={ 7 }
        pt={ 3 }
        sx={ {
          display: "flex",
          flexDirection: ["column", "column", "row"],
          gap: 8,
        } }
      >
        <Box sx={ { flex: 1, minWidth: 0 } }>
          <Box
            sx={ {
              padding: 2,
            } }
          >
            { /* // TODO: Add cover art, release date, etc into formik context. */ }
            Release details form (placeholder)
            <Box
              sx={ {
                display: "flex",
                flex: 1,
                gap: 1.5,
                minWidth: 0,
                mt: 2,
              } }
            >
              <Button
                // TODO: update disabled state.
                disabled={ true }
                variant="primary"
                width="compact"
                // TODO: Add logic to proceed to next step.
                onClick={ () => null }
              >
                Proceed
              </Button>

              <Button
                // TODO: update disabled state.
                disabled={ true }
                variant="outlined"
                width="compact"
                // TODO: Add logic to save release.
                onClick={ () => null }
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={ { flex: 1, minWidth: 0 } }>
          <Stack gap={ 3 }>
            { /* // TODO: add Release title and Artist name inputs to formik context. */ }
            <HorizontalLine />

            <Typography variant="h4">TRACKS</Typography>

            { /* // TODO: conditionally render Box with track list. */ }
            <Box
              sx={ {
                padding: 2,
              } }
            >
              Track list (placeholder)
            </Box>

            <Box
              sx={ {
                display: "flex",
                flexDirection: ["column", "column", "row"],
                gap: 2,
              } }
            >
              <Box width="100%">
                <Link
                  aria-label="Add new track"
                  sx={ {
                    textDecoration: "none",
                  } }
                  to={ addTrackPath }
                >
                  <DashedOutline
                    sx={ {
                      alignItems: "center",
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      padding: 3.5,
                    } }
                  >
                    <AddOutlined sx={ { marginRight: 0.5 } } /> Add new track
                  </DashedOutline>
                </Link>
              </Box>
            </Box>

            <HorizontalLine />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default ReleaseDetails;
