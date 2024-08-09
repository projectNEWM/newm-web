import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { Button } from "@newm-web/elements";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import LogoutIcon from "@mui/icons-material/Logout";
import { DEXHUNTER_MARKETPLACE_PARTNER_CODE } from "@newm-web/env";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  formatAdaAmount,
  formatNewmAmount,
  formatUsdAmount,
} from "@newm-web/utils";
import SwapNewmModal from "../modals/SwapNewmModal";

interface DisconnectWalletButtonProps {
  readonly adaBalance: number;
  readonly adaUsdBalance: number;
  readonly address?: string;
  readonly newmBalance: number;
  readonly newmUsdBalance: number;
  readonly onDisconnect?: VoidFunction;
}

/**
 * A button that displays the wallet balance and address, and
 * allows for disconnecting the wallet.
 */
const DisconnectWalletButton: FunctionComponent<
  DisconnectWalletButtonProps
> = ({
  address = "",
  adaBalance,
  newmBalance,
  newmUsdBalance,
  adaUsdBalance,
  onDisconnect,
}) => {
  const theme = useTheme();

  const parentRef = useRef<HTMLDivElement>(null);
  const [parentHeight, setParentHeight] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSwapModalVisible, setIsSwapModalVisible] = useState(false);
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

  const handleOpenSwapModal = () => {
    setIsDropdownOpen(false);
    setIsSwapModalVisible(true);
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
    <>
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
            <Typography whiteSpace="nowrap">
              { formatNewmAmount(newmBalance) }
            </Typography>
            <Typography sx={ { display: ["none", "none", "flex"] } }>
              |
            </Typography>
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
            <Stack
              alignItems="flex-start"
              color={ theme.colors.grey200 }
              direction="column"
              gap={ 1 }
              p={ 1.5 }
            >
              <Typography fontWeight={ 700 } variant="h5">
                WALLET ADDRESS
              </Typography>
              <Stack alignItems="flex-start" direction="row" gap={ 1 }>
                <Typography fontWeight={ 400 } sx={ { color: theme.colors.white } }>
                  { ellipsedAddress }
                </Typography>

                { isCopied ? (
                  <DoneIcon
                    fontSize="small"
                    sx={ { color: theme.colors.green } }
                  />
                ) : (
                  <ContentCopyIcon
                    fontSize="small"
                    sx={ { color: theme.colors.white, cursor: "pointer" } }
                    onClick={ handleClickCopyIcon }
                  />
                ) }
              </Stack>
            </Stack>

            <Stack alignItems="flex-start" direction="column" gap={ 1 } p={ 1.5 }>
              <Typography
                color={ theme.colors.grey200 }
                fontWeight={ 700 }
                variant="h5"
              >
                YOUR BALANCE
              </Typography>
              <Stack gap={ 0.25 }>
                <Typography sx={ { color: theme.colors.white } } variant="h4">
                  { formatNewmAmount(newmBalance) }
                </Typography>
                <Typography
                  color={ theme.colors.grey200 }
                  fontWeight={ 400 }
                  variant="h5"
                >
                  (≈{ formatUsdAmount(newmUsdBalance, 2) })
                </Typography>
              </Stack>

              <Stack gap={ 0.25 }>
                <Typography
                  fontWeight={ 400 }
                  sx={ { color: theme.colors.white } }
                  variant="h4"
                >
                  { formatAdaAmount(adaBalance) }
                </Typography>
                <Typography
                  color={ theme.colors.grey200 }
                  fontWeight={ 400 }
                  variant="h5"
                >
                  (≈{ formatUsdAmount(adaUsdBalance, 2) })
                </Typography>
              </Stack>
            </Stack>

            <Stack alignSelf="stretch" p={ 1.5 }>
              <Button
                fullWidth={ true }
                gradient="crypto"
                onClick={ handleOpenSwapModal }
              >
                Buy $NEWM Tokens
              </Button>
            </Stack>

            <Stack
              alignItems="center"
              direction="row"
              gap={ 1 }
              p={ 1.5 }
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

      <SwapNewmModal
        isOpen={ isSwapModalVisible }
        partnerCode={ DEXHUNTER_MARKETPLACE_PARTNER_CODE }
        partnerName="NEWMMarketplace"
        onClose={ () => setIsSwapModalVisible(false) }
      />
    </>
  );
};

export default DisconnectWalletButton;
