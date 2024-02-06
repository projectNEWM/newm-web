import { Box, Divider, Stack, useTheme } from "@mui/material";
import { Typography } from "@newm-web/elements";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import LogoutIcon from "@mui/icons-material/Logout";
import { FunctionComponent, useEffect, useRef, useState } from "react";

interface DisconnectWalletButtonProps {
  readonly address?: string;
  readonly balance?: string;
  readonly onDisconnect?: VoidFunction;
}

/**
 * A button that displays the wallet balance and address, and
 * allows for disconnecting the wallet.
 */
const DisconnectWalletButton: FunctionComponent<
  DisconnectWalletButtonProps
> = ({ address = "", balance = "", onDisconnect }) => {
  const theme = useTheme();

  const parentRef = useRef<HTMLDivElement>(null);
  const [parentHeight, setParentHeight] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const truncatedAddress = address ? address.slice(0, 16) : "";
  const ellipsedAddress = address
    ? address.slice(0, 16) + "..." + address.slice(-12)
    : "";

  /**
   * Toggles the dropdown.
   */
  const handleClickButton = () => {
    setIsDropdownOpen((isOpen) => !isOpen);
  };

  /**
   * Copies the saved wallet address to the clipboard.
   */
  const handleClickCopyIcon = () => {
    if (!address) return;

    navigator.clipboard.writeText(address);
    setIsCopied(true);
  };

  /**
   * Called when the user presses the dropdown disconnect button.
   */
  const handleDisconnect = () => {
    setIsDropdownOpen(false);
    onDisconnect?.();
  };

  /**
   * Resets the successfully copied icon after it appears.
   */
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  /**
   * Gets the height of the menu button on initial mount and screen resize.
   */
  useEffect(() => {
    const getParentHeight = () => {
      if (!parentRef.current) return;
      setParentHeight(parentRef.current.offsetHeight);
    };

    getParentHeight();

    window.addEventListener("resize", getParentHeight);

    return () => {
      window.removeEventListener("resize", getParentHeight);
    };
  }, []);

  return (
    <Stack
      alignItems="flex-end"
      direction="column"
      gap={ 1 }
      position="relative"
      ref={ parentRef }
    >
      <Stack
        direction="row"
        sx={ {
          alignItems: "center",
          border: `2px solid ${theme.colors.white}`,
          borderRadius: "4px",
          cursor: "pointer",
          pl: 2,
          pr: 1.2,
          py: 1,
        } }
        onClick={ handleClickButton }
      >
        <Stack direction={ ["column", "column", "row"] } gap={ 1 }>
          <Typography>{ balance } ₳</Typography>
          <Typography sx={ { display: ["none", "none", "flex"] } }>|</Typography>
          <Typography>{ truncatedAddress }</Typography>
        </Stack>

        <Box alignItems="center" justifyContent="center" lineHeight="0px">
          { isDropdownOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
        </Box>
      </Stack>

      { isDropdownOpen && (
        <Stack
          direction="column"
          divider={
            <Divider sx={ { borderColor: theme.colors.grey500 } } flexItem />
          }
          position="absolute"
          sx={ {
            alignItems: "flex-start",
            backgroundColor: theme.colors.grey600,
            border: `2px solid ${theme.colors.grey500}`,
            borderRadius: "4px",
            zIndex: 10,
          } }
          top={ parentHeight + 8 }
        >
          <Stack alignItems="flex-start" direction="row" gap={ 1 } p={ 2 }>
            <Typography fontWeight={ 500 } sx={ { color: theme.colors.grey200 } }>
              { ellipsedAddress }
            </Typography>

            { isCopied ? (
              <DoneIcon fontSize="small" sx={ { color: theme.colors.green } } />
            ) : (
              <ContentCopyIcon
                fontSize="small"
                sx={ { color: theme.colors.grey200, cursor: "pointer" } }
                onClick={ handleClickCopyIcon }
              />
            ) }
          </Stack>

          <Stack
            alignItems="center"
            direction="row"
            gap={ 1 }
            p={ 2 }
            sx={ {
              "&:hover": { backgroundColor: theme.colors.grey500 },
              cursor: "pointer",
            } }
            width="100%"
            onClick={ handleDisconnect }
          >
            <LogoutIcon fontSize="small" sx={ { color: theme.colors.white } } />
            <Typography sx={ { color: theme.colors.white } }>
              Disconnect
            </Typography>
          </Stack>
        </Stack>
      ) }
    </Stack>
  );
};

export default DisconnectWalletButton;
