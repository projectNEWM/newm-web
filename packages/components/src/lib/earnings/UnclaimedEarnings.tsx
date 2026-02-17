import { Box, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import { Button, Tooltip } from "@newm-web/elements";
import theme from "@newm-web/theme";
import HelpIcon from "@mui/icons-material/Help";
import { formatNewmAmount, formatUsdAmount } from "@newm-web/utils";
import { FunctionComponent, useState } from "react";
import EarningsSummaryModal from "./EarningsSummaryModal";

interface UnclaimedEarningsProps {
  readonly isClaimEarningsLoading: boolean;
  readonly isConversionLoading: boolean;
  readonly isEarningsError: boolean;
  readonly isEarningsLoading: boolean;
  readonly onClaimEarnings: () => Promise<void>;
  readonly transactionFeeInADA: number;
  readonly transactionFeeInUSD: number;
  readonly unclaimedEarningsInNEWM: number;
  readonly unclaimedEarningsInUSD: number;
}

const UnclaimedEarnings: FunctionComponent<UnclaimedEarningsProps> = ({
  unclaimedEarningsInNEWM,
  unclaimedEarningsInUSD,
  isEarningsLoading,
  isConversionLoading,
  isEarningsError,
  isClaimEarningsLoading,
  transactionFeeInUSD,
  transactionFeeInADA,
  onClaimEarnings,
}) => {
  const [isEarningsSummaryModalOpen, setIsEarningsSummaryModalOpen] =
    useState(false);

  const handleOpenModal = () => {
    setIsEarningsSummaryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEarningsSummaryModalOpen(false);
  };

  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.grey600,
        borderRadius: "8px",
        display: "flex",
        gap: 3,
        justifyContent: "space-between",
        minHeight: "100px",
        padding: 2.5,
        width: "max-content",
      } }
    >
      <Box
        sx={ {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        } }
      >
        <Stack alignItems="center" direction="row" gap={ 1 } pb={ 1.5 }>
          <Typography
            color={ theme.colors.grey100 }
            fontSize={ 12 }
            fontWeight={ 500 }
          >
            YOU HAVE UNCLAIMED EARNINGS
          </Typography>
          <Tooltip title="Details about your unclaimed earnings.">
            <IconButton sx={ { padding: 0 } }>
              <HelpIcon sx={ { color: theme.colors.grey100 } } />
            </IconButton>
          </Tooltip>
        </Stack>

        { isEarningsLoading || isConversionLoading ? (
          <Stack>
            <Skeleton height={ 36 } width={ 160 } />
            <Skeleton height={ 24 } width={ 80 } />
          </Stack>
        ) : (
          <>
            <Typography
              fontSize="24px"
              fontWeight={ 700 }
              lineHeight="28px"
              pb={ 0.5 }
            >
              { formatNewmAmount(unclaimedEarningsInNEWM) }
            </Typography>
            <Typography
              color={ theme.colors.grey200 }
              fontWeight={ 500 }
              variant="subtitle1"
            >
              (
              { formatUsdAmount(unclaimedEarningsInUSD, {
                includeEstimateSymbol: true,
              }) }
              ){ " " }
            </Typography>
          </>
        ) }
      </Box>
      <Box sx={ { alignSelf: "center" } }>
        <Button
          color="white"
          disabled={
            isEarningsLoading || isEarningsError || isClaimEarningsLoading
          }
          variant="outlined"
          width="compact"
          onClick={ handleOpenModal }
        >
          Claim now
        </Button>
        <EarningsSummaryModal
          isLoading={ isClaimEarningsLoading }
          isOpen={ isEarningsSummaryModalOpen }
          transactionFeeInADA={ transactionFeeInADA }
          transactionFeeInUSD={ transactionFeeInUSD }
          unclaimedEarningsInNEWM={ unclaimedEarningsInNEWM }
          unclaimedEarningsInUSD={ unclaimedEarningsInUSD }
          onClose={ handleCloseModal }
          onSubmit={ onClaimEarnings }
        />
      </Box>
    </Box>
  );
};

export default UnclaimedEarnings;
