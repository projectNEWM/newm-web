import { Box, useTheme } from "@mui/material";
import { Link } from "elements";
import { Modal } from "components";
import { FunctionComponent, useState } from "react";
import SocialsModal from "./SocialsModal";
import FAQModal from "./FAQModal";

interface Links {
  readonly key: string;
  readonly label: string;
  readonly to: string;
  readonly type: "router" | "web";
}

const Footer: FunctionComponent = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [modalId, setModalId] = useState("");

  const handleClose = () => setIsOpen(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpen = (event: any) => {
    setModalId(event?.target?.getAttribute("id"));
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
      to: "#",
      label: "Artist Socials",
      type: "router",
      key: "socials",
    },
    {
      to: "#",
      label: "FAQ",
      type: "router",
      key: "faq",
    },
    {
      to: "#",
      label: "NEWM.io",
      type: "web",
      key: "newm",
    },
    {
      to: "#",
      label: "Disclaimer",
      type: "web",
      key: "disclaimer",
    },
    {
      to: "#",
      label: "Terms of Service",
      type: "web",
      key: "terms",
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
        { links.map(({ to, label, type, key }) =>
          type === "router" ? (
            <Link
              id={ key }
              key={ key }
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
