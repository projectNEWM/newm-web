import { Box, Divider, Stack, useTheme } from "@mui/material";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { useAppDispatch, useAppSelector } from "@newm.io/studio/common";
import { Typography } from "@newm.io/studio/elements";
import currency from "currency.js";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import LogoutIcon from "@mui/icons-material/Logout";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { setIsConnectWalletModalOpen } from "@newm.io/studio/modules/ui";
import { selectWallet, setWalletAddress, setWalletBalance } from "@newm.io/studio/modules/wallet";

const DisconnectWalletButton: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { walletAddress, walletBalance } = useAppSelector(selectWallet);
  const { wallet, getBalance, getAddress } = useConnectWallet();

  const parentRef = useRef<HTMLDivElement>(null);
  const [parentHeight, setParentHeight] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const truncatedAddress = walletAddress ? walletAddress.slice(0, 16) : "";
  const ellipsedAddress = walletAddress ? walletAddress.slice(0, 16) + "..." + walletAddress.slice(-12) : "";

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
    if (!walletAddress) return;

    navigator.clipboard.writeText(walletAddress);
    setIsCopied(true);
  };

  /**
   * Opens the disconnect wallet modal
   */
  const handleDisconnectWallet = () => {
    dispatch(setIsConnectWalletModalOpen(true));
    setIsDropdownOpen(false);
  };

  /**
   * Gets the ADA balance from the wallet and updates the Redux state.
   */
  useEffect(() => {
    if (wallet) {
      getBalance((value) => {
        const adaBalance = currency(value, { symbol: "" }).format();
        dispatch(setWalletBalance(adaBalance));
      });
    }
  }, [wallet, getBalance, dispatch]);

  /**
   * Gets an address from the wallet and updates the Redux state.
   */
  useEffect(() => {
    if (wallet) {
      getAddress((value) => {
        dispatch(setWalletAddress(value));
      });
    }
  }, [wallet, getAddress, dispatch]);

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
    <Stack ref={ parentRef } position="relative" direction="column" gap={ 1 } alignItems="flex-end">
      <Stack
        direction="row"
        onClick={ handleClickButton }
        sx={ {
          pl: 2,
          pr: 1.2,
          py: 1,
          alignItems: "center",
          border: `2px solid ${theme.colors.white}`,
          borderRadius: "4px",
          cursor: "pointer",
        } }
      >
        <Stack direction={ ["column", "column", "row"] } gap={ 1 }>
          <Typography>{ walletBalance } ₳</Typography>
          <Typography sx={ { display: ["none", "none", "flex"] } }>|</Typography>
          <Typography>{ truncatedAddress }</Typography>
        </Stack>

        <Box justifyContent="center" alignItems="center" lineHeight="0px">
          { isDropdownOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
        </Box>
      </Stack>

      { isDropdownOpen && (
        <Stack
          top={ parentHeight + 8 }
          position="absolute"
          direction="column"
          divider={ <Divider flexItem sx={ { borderColor: theme.colors.grey500 } } /> }
          sx={ {
            alignItems: "flex-start",
            backgroundColor: theme.colors.grey600,
            border: `2px solid ${theme.colors.grey500}`,
            borderRadius: "4px",
            zIndex: 10,
          } }
        >
          <Stack direction="row" alignItems="flex-start" gap={ 1 } p={ 2 }>
            <Typography fontWeight={ 500 } sx={ { color: theme.colors.grey200 } }>
              { ellipsedAddress }
            </Typography>

            { isCopied ? (
              <DoneIcon fontSize="small" sx={ { color: theme.colors.green } } />
            ) : (
              <ContentCopyIcon
                fontSize="small"
                sx={ { cursor: "pointer", color: theme.colors.grey200 } }
                onClick={ handleClickCopyIcon }
              />
            ) }
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            gap={ 1 }
            p={ 2 }
            onClick={ handleDisconnectWallet }
            sx={ {
              cursor: "pointer",
              "&:hover": { backgroundColor: theme.colors.grey500 },
            } }
            width="100%"
          >
            <LogoutIcon fontSize="small" sx={ { color: theme.colors.white } } />
            <Typography sx={ { color: theme.colors.white } }>Disconnect</Typography>
          </Stack>
        </Stack>
      ) }
    </Stack>
  );
};

export default DisconnectWalletButton;
