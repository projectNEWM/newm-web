import { FunctionComponent } from "react";
import { Link, Stack, Typography } from "@mui/material";
import theme from "@newm-web/theme";
import moment from "moment";
import { Sale } from "../modules/sale";

interface SaleMetaDataProps {
  readonly sale?: Sale;
}

interface SaleDetailProps {
  readonly label: string;
  readonly value: string | number;
}

interface SaleLinkProps {
  readonly href: string;
  readonly label: string;
}

const SaleDetail = ({ label, value }: SaleDetailProps) => (
  <Stack gap={ 0.5 }>
    <Typography fontWeight={ 600 } variant="subtitle2">
      { label }
    </Typography>
    <Typography sx={ { overflow: "auto", pb: 2.5, textWrap: "nowrap" } }>
      { value }
    </Typography>
  </Stack>
);

const SaleLink = ({ label, href }: SaleLinkProps) => (
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
      Link
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
      <SaleLink href={ sale.song.assetUrl } label="POOL.PM" />
      <SaleDetail label="POLICY ID" value={ sale.bundlePolicyId } />
      <SaleLink href={ sale.song.tokenAgreementUrl } label="CONTRACT PREVIEW" />
    </Stack>
  );
};

export default SaleMetaData;
