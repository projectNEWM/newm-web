import { FunctionComponent } from "react";
import { Link, Stack, Typography } from "@mui/material";
import theme from "@newm-web/theme";
import moment from "moment";
import { Sale } from "@newm-web/types";

interface SaleMetaDataProps {
  readonly sale?: Sale;
}

interface SaleDetailProps {
  readonly label: string;
  readonly selectAllText?: boolean;
  readonly value: string | number;
}

interface SaleLinkProps {
  readonly href: string;
  readonly label: string;
  readonly linkText: string;
}

const SaleDetail = ({
  label,
  value,
  selectAllText = false,
}: SaleDetailProps) => (
  <Stack gap={ 0.5 }>
    <Typography fontWeight={ 600 } variant="subtitle2">
      { label }
    </Typography>
    <Typography
      sx={ {
        overflow: "auto",
        pb: 2.5,
        textWrap: "nowrap",
        userSelect: selectAllText ? "all" : "auto",
      } }
    >
      { value }
    </Typography>
  </Stack>
);

const SaleLink = ({ href, label, linkText }: SaleLinkProps) => (
  <Stack color={ theme.colors.music } gap={ 0.5 }>
    <Typography fontWeight={ 600 } variant="subtitle2">
      { label }
    </Typography>
    <Link
      href={ href }
      rel="noopener noreferrer"
      sx={ { width: "fit-content" } }
      target="_blank"
      variant="h4"
    >
      { linkText }
    </Link>
  </Stack>
);

const SaleMetaData: FunctionComponent<SaleMetaDataProps> = ({ sale }) => {
  if (!sale) return null;

  return (
    <Stack
      display="grid"
      gap={ 5 }
      gridTemplateColumns={ "repeat(auto-fit, 180px)" }
      justifyContent="center"
      my={ 7.5 }
    >
      <SaleDetail
        label="QUANTITY AVAILABLE"
        value={ sale.availableBundleQuantity.toLocaleString() }
      />
      <SaleDetail
        label="RELEASE DATE"
        value={ moment(sale.createdAt).format("L") }
      />
      <SaleDetail label="GENRE" value={ sale.song.genres.join(", ") } />
      <SaleDetail label="MOOD" value={ sale.song.moods.join(", ") } />
      <SaleLink
        href={ sale.song.assetUrl }
        label="POOL.PM"
        linkText="Listing Details"
      />
      <SaleDetail
        label="POLICY ID"
        selectAllText={ true }
        value={ sale.bundlePolicyId }
      />
      <SaleLink
        href={ sale.song.tokenAgreementUrl }
        label="CONTRACT PREVIEW"
        linkText="View Details"
      />
      <SaleDetail
        label="POINTER POLICY ID"
        selectAllText={ true }
        value={ sale.pointerPolicyId }
      />
    </Stack>
  );
};

export default SaleMetaData;
