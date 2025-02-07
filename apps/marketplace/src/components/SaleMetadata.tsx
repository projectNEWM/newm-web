import { FunctionComponent } from "react";
import { Link, Stack, Typography } from "@mui/material";
import theme from "@newm-web/theme";
import moment from "moment";
import { Sale } from "@newm-web/types";

interface SaleMetaDataProps {
  readonly sale?: Sale;
}

interface SaleDetailProps {
  readonly isSelectableOnClick?: boolean;
  readonly label: string;
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
  isSelectableOnClick = false,
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
        userSelect: isSelectableOnClick ? "all" : "auto",
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
        isSelectableOnClick={ true }
        label="POLICY ID"
        value={ sale.bundlePolicyId }
      />
      <SaleLink
        href={ sale.song.tokenAgreementUrl }
        label="CONTRACT PREVIEW"
        linkText="View Details"
      />
      <SaleDetail
        isSelectableOnClick={ true }
        label="POINTER ASSET NAME"
        value={ sale.pointerAssetName }
      />
    </Stack>
  );
};

export default SaleMetaData;
