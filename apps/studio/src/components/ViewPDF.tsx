import { Box, Stack, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LaunchIcon from "@mui/icons-material/Launch";
import PreviewIcon from "@mui/icons-material/PictureInPictureAlt";
import DownloadIcon from "@mui/icons-material/FileDownload";
import { SolidOutline } from "@newm-web/elements";
import { IconMessage, Modal } from "@newm-web/elements";
import { FunctionComponent, useRef, useState } from "react";

interface ViewPdfProps {
  /** Encoded base64 string of PDF file */
  readonly data: string;
  /** True if the PDF has been viewed */
  readonly isViewed?: boolean;
  /** Called when the agreement is previewed or downloaded */
  readonly onViewPDF?: VoidFunction;
  /** Preview image for PDF file */
  readonly preview: string;
}

/**
 * Component to preview or download a PDF file.
 */
const ViewPDF: FunctionComponent<ViewPdfProps> = ({
  data,
  preview,
  onViewPDF,
  isViewed = false,
}) => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const { colors } = useTheme();

  const [isHovered, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const agreementData = `data:application/pdf;base64,${data}`;

  const handlePreview = () => {
    setIsModalOpen(true);
    if (onViewPDF) onViewPDF();
  };

  const handleDownload = () => {
    linkRef.current?.click();
    if (onViewPDF) onViewPDF();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box>
        <a
          download="artist-agreement.pdf"
          href={ agreementData }
          ref={ linkRef }
          style={ { display: "none" } }
        >
          Download
        </a>

        <SolidOutline
          sx={ {
            alignItems: "stretch",
            background: [
              "linear-gradient(0deg, rgba(28, 28, 30, 0.9), rgba(28, 28, 30, 0.9))",
              `url(${preview})`,
            ].join(", "),
            backgroundSize: "cover",
            cursor: "pointer",
            display: "flex",
            flexGrow: 1,
            height: 100,
            justifyContent: "space-between",
          } }
          onMouseEnter={ () => setIsHovering(true) }
          onMouseLeave={ () => setIsHovering(false) }
        >
          { isHovered ? (
            <Stack alignItems="stretch" direction="row" flex={ 1 }>
              { [
                {
                  icon: <PreviewIcon sx={ { color: colors.white } } />,
                  message: "Preview",
                  onClick: handlePreview,
                },
                {
                  icon: <DownloadIcon sx={ { color: colors.white } } />,
                  message: "Download",
                  onClick: handleDownload,
                },
              ].map(({ icon, message, onClick }) => (
                <Box
                  key={ `agreement-option-${message}` }
                  sx={ {
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                    },
                    alignItems: "center",
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                  } }
                  onClick={ onClick }
                >
                  <IconMessage icon={ icon } message={ message } />
                </Box>
              )) }
            </Stack>
          ) : isViewed ? (
            <IconMessage
              icon={ <CheckCircleIcon sx={ { color: colors.green } } /> }
              message="Document read"
            />
          ) : (
            <IconMessage
              icon={ <LaunchIcon sx={ { color: colors.white } } /> }
              message="View contract"
            />
          ) }
        </SolidOutline>
      </Box>

      <Modal isOpen={ isModalOpen } onClose={ handleCloseModal }>
        <object
          aria-label="Artist agreement"
          data={ `data:application/pdf;base64,${data}` }
          style={ { height: "100%", width: "100%" } }
          type="application/pdf"
        />
      </Modal>
    </>
  );
};

export default ViewPDF;
