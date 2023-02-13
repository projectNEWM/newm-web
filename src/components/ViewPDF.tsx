import { Box, Stack, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LaunchIcon from "@mui/icons-material/Launch";
import PreviewIcon from "@mui/icons-material/PictureInPictureAlt";
import DownloadIcon from "@mui/icons-material/FileDownload";
import { IconMessage, Modal, SolidOutline } from "components";
import { FunctionComponent, useRef, useState } from "react";

interface ViewPdfProps {
  /** True if the PDF has been viewed */
  readonly isViewed?: boolean;
  /** Called when the agreement is either viewed or downloaded */
  readonly onViewPDF: VoidFunction;
  /** Encoded base64 string of agreement PDF file */
  readonly data: string;
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
  };

  const handleDownload = () => {
    linkRef.current?.click();
    onViewPDF();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onViewPDF();
  };

  return (
    <>
      <Box>
        <a
          ref={ linkRef }
          style={ { display: "none" } }
          href={ agreementData }
          download="artist-agreement.pdf"
        >
          Download
        </a>

        <SolidOutline
          onMouseEnter={ () => setIsHovering(true) }
          onMouseLeave={ () => setIsHovering(false) }
          sx={ {
            height: 100,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            background: [
              "linear-gradient(0deg, rgba(28, 28, 30, 0.9), rgba(28, 28, 30, 0.9))",
              `url(${preview})`,
            ].join(", "),
            backgroundSize: "cover",
            flexGrow: 1,
            cursor: "pointer",
          } }
        >
          { isHovered ? (
            <Stack direction="row" flex={ 1 } alignItems="stretch">
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
                  onClick={ onClick }
                  sx={ {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                    },
                  } }
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
        <embed
          style={ { height: "100%", width: "100%" } }
          src={ `data:application/pdf;base64,${data}` }
        />
      </Modal>
    </>
  );
};

export default ViewPDF;
