import { Box, useTheme } from "@mui/material";
import { Link } from "elements";
import { Modal } from "components";
import { FunctionComponent, useState } from "react";
import SocialsModal from "./SocialsModal";
import FAQModal from "./FAQModal";

interface Links {
  readonly handleOpen?: VoidFunction;
  readonly label: string;
  readonly to: string;
  readonly type: "router" | "web";
}

const Footer: FunctionComponent = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [modalId, setModalId] = useState("");

  const handleClose = () => setIsOpen(false);

  const handleSocialsOpen = () => {
    setModalId("socials");
    setIsOpen(true);
  };

  const handleFaqOpen = () => {
    setModalId("faq");
    setIsOpen(true);
  };

  const ModalContent = () => {
    switch (modalId) {
      case "faq":
        return <FAQModal />;
      case "socials":
        return <SocialsModal />;
      default:
        return null;
    }
  };

  const links: ReadonlyArray<Links> = [
    {
      handleOpen: handleSocialsOpen,
      label: "Artist Socials",
      to: "#",
      type: "router",
    },
    {
      handleOpen: handleFaqOpen,
      label: "FAQ",
      to: "#",
      type: "router",
    },
    {
      label: "NEWM.io",
      to: "#",
      type: "web",
    },
    {
      label: "Disclaimer",
      to: "#",
      type: "web",
    },
    {
      label: "Terms of Service",
      to: "#",
      type: "web",
    },
  ];

  return (
    <Box
      display={ ["flex", "flex", "block"] }
      justifyContent={ ["center", "center", "space-between"] }
    >
      <Modal open={ isOpen } handleClose={ handleClose }>
        <ModalContent />
      </Modal>
      <Box
        sx={ {
          alignItems: ["flex-start", "flex-start", "center"],
          display: "flex",
          flexDirection: ["column", "column", "row"],
          justifyContent: "space-around",
          py: 2.25,
        } }
      >
        { links.map(({ handleOpen, label, to, type }, idx) =>
          type === "router" ? (
            <Link
              key={ `footer-link-${idx}` }
              onClick={ handleOpen }
              sx={ { p: 0.5, fontWeight: 400 } }
              to={ to }
              underline={ false }
            >
              { label }
            </Link>
          ) : (
            <a
              key={ label }
              href={ to }
              style={ {
                color: theme.colors.white,
                fontWeight: 400,
                padding: "4px",
                textDecoration: "none",
              } }
            >
              { label }
            </a>
          )
        ) }
      </Box>
    </Box>
  );
};

export default Footer;
