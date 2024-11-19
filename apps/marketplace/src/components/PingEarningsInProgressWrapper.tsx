import { PingEarningsInProgress } from "@newm-web/components";
import { selectWallet, useGetEarningsQuery } from "../modules/wallet";
import { useAppSelector } from "../common";

const PingEarningsInProgressWrapper = () => {
  const { walletAddress = "" } = useAppSelector(selectWallet);

  return (
    <PingEarningsInProgress
      getEarningsQuery={ useGetEarningsQuery }
      walletAddress={ walletAddress }
    />
  );
};

export default PingEarningsInProgressWrapper;
