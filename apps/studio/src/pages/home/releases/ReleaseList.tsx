import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Link,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";

import theme from "@newm-web/theme";
import {
  ActionMenu,
  type ActionMenuItem,
  ActionMenuTrigger,
} from "@newm-web/components";
import { TableCell, TablePagination, Tooltip } from "@newm-web/elements";
import {
  getImageSrc,
  resizeCloudinaryImage,
  useWindowDimensions,
} from "@newm-web/utils";
import { MintingStatus as MintingStatusType } from "@newm-web/types";
import { NEWMCoverArtPlaceholderMin } from "@newm-web/assets";

import NoSongsYet from "./NoSongsYet";
import { ErrorOccurredMintingStatuses, MintingStatus } from "./MintingStatus";
import TableHead from "./Table/TableHead";
import ReleaseDeletionHelp from "./ReleaseDeletionHelp";
import { Release } from "../../../modules/releases";
import { convertMillisecondsToSongFormat } from "../../../modules/song";
import { NEWM_SUPPORT_LINK } from "../../../common";

// ! DO NOT USE IN PRODUCTION YET <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

interface ReleaseListProps {
  query: string;
  releaseData?: Release[];
  rowHeight?: number;
  totalCountOfSongs?: number;
}

// TODO: REmove once we have the real data.
const mockReleases: Release[] = [
  {
    coverArtUrl:
      // eslint-disable-next-line max-len
      "https://res.cloudinary.com/newm/image/upload/w_40,h_40,c_fill,q_auto,f_auto/v1770039488/czjfak8zxdsspxf3ihfj.jpg",
    genres: ["Pop"],
    hasSubmittedForDistribution: false,
    id: "release-1",
    locked: false,
    mintingStatus: MintingStatusType.SubmittedForDistribution,
    title: "Indoor Kites",
  },
  {
    coverArtUrl: "",
    genres: ["Rock"],
    hasSubmittedForDistribution: true,
    id: "release-2",
    locked: false,
    mintingStatus: MintingStatusType.Undistributed,
    title: "The Major League",
  },
  {
    coverArtUrl:
      // eslint-disable-next-line max-len
      "https://res.cloudinary.com/newm/image/upload/w_40,h_40,c_fill,q_auto,f_auto/v1770039488/czjfak8zxdsspxf3ihfj.jpg",
    genres: ["Alternative Rock", "Indie Rock", "Rock", "Alternative", "Indie"],
    hasSubmittedForDistribution: true,
    id: "release-3",
    locked: true,
    mintingStatus: MintingStatusType.Minted,
    title: "Go!",
    totalTracksLength: 460000,
  },
  {
    coverArtUrl: "",
    errorMessage: "Distribution error",
    genres: ["Pop"],
    id: "release-4",
    locked: true,
    mintingStatus: MintingStatusType.DistributionException,
    title: "All I Want",
  },
  {
    coverArtUrl: "",
    errorMessage: "Declined",
    genres: ["Electronic", "Instrumental"],
    id: "release-5",
    locked: true,
    mintingStatus: MintingStatusType.Declined,
    title: "Lafayette Blvd",
    totalTracksLength: 220000,
  },
];

const getTooltipContent = (mintingStatus: MintingStatusType) => {
  const isErrorMintingStatus =
    ErrorOccurredMintingStatuses.includes(mintingStatus);

  let content: JSX.Element | string = "";

  if (isErrorMintingStatus) {
    content = (
      <span>
        An error has occurred. Please reach out via the{ " " }
        <Link
          href={ NEWM_SUPPORT_LINK }
          rel="noopener noreferrer"
          target="_blank"
          onClick={ (event) => event.stopPropagation() }
        >
          NEWM Support Portal
        </Link>{ " " }
        for assistance distributing your release.
      </span>
    );
  } else if (mintingStatus === MintingStatusType.Declined) {
    content =
      "One or more issues occurred resulting in your " +
      "distribution being declined. Please check your " +
      "email for information on how to correct and resubmit your release.";
  }

  return content;
};

export default function ReleaseList({
  totalCountOfSongs,
  query = "",
  // TODO: Remove mock data once we have the real data.
  releaseData = mockReleases,
}: ReleaseListProps) {
  const navigate = useNavigate();
  const viewportHeight = useWindowDimensions()?.height;

  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [page, setPage] = useState(1);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuRelease, setMenuRelease] = useState<Release | null>(null);

  const headerHeight = 245;
  const footerHeight = 40;
  const bottomPadding = 30;
  const rowHeight = 65;
  let releasesToRequest = rowsPerPage;

  const filteredReleases = useMemo(() => {
    if (!query) return releaseData;
    const lowerQuery = query.toLowerCase();

    return releaseData.filter((release) =>
      release.title?.toLowerCase().includes(lowerQuery)
    );
  }, [query, releaseData]);

  // TODO(webStudioAlbumPhaseTwo): Use total count from the RTK query response.
  const totalCountOfReleases = totalCountOfSongs ?? filteredReleases.length;
  const lastRowOnPage = (page - 1) * rowsPerPage + rowsPerPage;
  const totalPagesCount = Math.ceil(totalCountOfReleases / rowsPerPage);
  const remainingRowsOnLastPage = totalCountOfReleases % rowsPerPage;

  // * Determines how many releases to request for the last page.
  if (page === totalPagesCount) {
    releasesToRequest =
      remainingRowsOnLastPage > 0 ? remainingRowsOnLastPage : rowsPerPage;
  }

  const pagedReleases = filteredReleases.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + releasesToRequest
  );

  const handleRowClick = (
    event: MouseEvent<HTMLButtonElement | HTMLTableRowElement>,
    releaseId: string
  ) => {
    event.stopPropagation();
    navigate(`/home/releases/${releaseId}`);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const handleMenuOpen =
    (release: Release) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setMenuAnchorEl(event.currentTarget);
      setMenuRelease(release);
    };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuRelease(null);
  };

  const actionMenuItems = useMemo<ReadonlyArray<ActionMenuItem>>(() => {
    if (!menuRelease) return [];

    const isReleaseEditable = !menuRelease.locked;
    const isReleaseDeletable = !menuRelease.locked;

    const items: ActionMenuItem[] = [
      {
        icon: isReleaseEditable ? (
          <EditIcon fontSize="small" />
        ) : (
          <VisibilityIcon fontSize="small" />
        ),
        id: "view-edit",
        label: isReleaseEditable ? "Edit" : "View",
        onClick: () => navigate(`/home/releases/${menuRelease.id}`),
      },
      {
        icon: <LinkIcon fontSize="small" />,
        id: "view-outlet-urls",
        label: "View outlet URLs",
        onClick: () => null,
      },
      {
        color: "danger",
        disabled: !isReleaseDeletable,
        icon: <DeleteIcon fontSize="small" />,
        id: "delete",
        label: "Delete",
        // TODO: Implement delete functionality | Render the DeleteReleaseModal.
        onClick: () => null,
        tooltip: !isReleaseDeletable ? <ReleaseDeletionHelp /> : undefined,
        tooltipPlacement: "left",
      },
    ];

    return items;
  }, [menuRelease, navigate]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    setMenuAnchorEl(null);
    setMenuRelease(null);
  }, [page, query, releaseData]);

  // sets the # of rows per page depending on viewport height
  useEffect(() => {
    if (viewportHeight) {
      const rowsWithCurrentHeight = Math.abs(
        Math.floor(
          (viewportHeight - headerHeight - footerHeight - bottomPadding) /
            rowHeight
        )
      );

      setRowsPerPage(rowsWithCurrentHeight ? rowsWithCurrentHeight : 1);
      setPage(1);
    }
  }, [viewportHeight]);

  if (!filteredReleases.length && !query) {
    return <NoSongsYet />;
  }

  if (!pagedReleases.length) {
    return <Typography>No releases matched your search.</Typography>;
  }

  return (
    <TableContainer>
      <Table aria-label="Release List" size="small">
        <TableHead />
        <TableBody>
          { pagedReleases.map((release) => {
            return (
              <TableRow
                key={ release.id }
                sx={ {
                  "&:hover, &:focus": {
                    background: theme.colors.activeBackground,
                  },
                  WebkitTapHighlightColor: "transparent",
                  cursor: "pointer",
                } }
                onClick={ (event) => handleRowClick(event, release.id) }
              >
                <TableCell>
                  <Box sx={ { alignItems: "center", display: "flex" } }>
                    { release.coverArtUrl ? (
                      <img
                        alt="Album cover"
                        src={ resizeCloudinaryImage(release.coverArtUrl) }
                        style={ {
                          borderRadius: "4px",
                          height: "40px",
                          width: "40px",
                        } }
                      />
                    ) : (
                      <Box
                        alt="NEWM Monster"
                        component="img"
                        src={ getImageSrc(NEWMCoverArtPlaceholderMin) }
                        sx={ {
                          borderRadius: "4px",
                          height: 40,
                          maxWidth: "100%",
                          width: 40,
                        } }
                      />
                    ) }
                    <Box
                      sx={ {
                        fontWeight: "500",
                        maxWidth: { sm: "none", xs: "110px" },
                        overflow: "auto",
                        paddingLeft: "12px",
                        whiteSpace: "nowrap",
                      } }
                    >
                      { release.title ?? "--" }
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={ { display: { sm: "table-cell", xs: "none" } } }>
                  { release.mintingStatus ? (
                    <Tooltip title={ getTooltipContent(release.mintingStatus) }>
                      <Box
                        sx={ {
                          alignItems: "center",
                          display: "flex",
                        } }
                      >
                        <MintingStatus mintingStatus={ release.mintingStatus } />
                      </Box>
                    </Tooltip>
                  ) : (
                    "--"
                  ) }
                </TableCell>
                <TableCell sx={ { display: { lg: "table-cell", xs: "none" } } }>
                  { release.genres?.length ? (
                    <Tooltip title={ release.genres.join(", ") }>
                      <Box
                        sx={ {
                          maxWidth: 130,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        } }
                      >
                        { release.genres.join(", ") }
                      </Box>
                    </Tooltip>
                  ) : (
                    "--"
                  ) }
                </TableCell>
                <TableCell sx={ { display: { lg: "table-cell", xs: "none" } } }>
                  { /* // ! Phase 1 → NO. OF TRACKS = 1; single-track until /v1/releases supports 'trackCount' */ }
                  1
                </TableCell>
                <TableCell
                  sx={ {
                    display: { md: "table-cell", xs: "none" },
                    textAlign: "end",
                  } }
                >
                  { release.totalTracksLength
                    ? convertMillisecondsToSongFormat(release.totalTracksLength)
                    : "--:--" }
                </TableCell>
                <TableCell
                  sx={ {
                    paddingLeft: [0, 1],
                    paddingRight: [1, 3],
                    textAlign: "end",
                    width: "0",
                  } }
                >
                  <ActionMenuTrigger onClick={ handleMenuOpen(release) } />
                </TableCell>
              </TableRow>
            );
          }) }
        </TableBody>

        { totalCountOfReleases > pagedReleases.length && (
          <TablePagination
            cellStyles={ { paddingTop: "12px" } }
            colSpan={ 6 }
            handlePageChange={ handlePageChange }
            lastRowOnPage={ lastRowOnPage }
            numberOfRows={ totalCountOfReleases }
            page={ page }
            rows="releases"
            rowsPerPage={ rowsPerPage }
          />
        ) }
      </Table>

      <ActionMenu
        anchorEl={ menuAnchorEl }
        anchorOrigin={ { horizontal: "left", vertical: "bottom" } }
        items={ actionMenuItems }
        menuPaperSx={ { marginLeft: 5 } }
        open={ Boolean(menuAnchorEl) }
        transformOrigin={ { horizontal: "right", vertical: "top" } }
        onClose={ handleMenuClose }
      />
    </TableContainer>
  );
}
