import { FunctionComponent, PropsWithChildren } from "react";
import { useFlags } from "launchdarkly-react-client-sdk";
import { Link, Stack, Typography } from "@mui/material";
import { DiscordLogo, NEWMLogo, NEWMMonster } from "@newm-web/assets";
import theme from "@newm-web/theme";
import { NEWM_DISCORD_URL, getImageSrc } from "@newm-web/utils";

interface MaintenanceProps extends PropsWithChildren {
  readonly flagName: string;
}

const Maintenance: FunctionComponent<MaintenanceProps> = ({
  children,
  flagName,
}) => {
  const flags = useFlags();
  const isMaintenanceModeEnabled = flags[flagName];

  return isMaintenanceModeEnabled ? (
    <Stack
      sx={ {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        minHeight: "100%",
        px: [0.5, 1, 2],
        textAlign: "center",
      } }
    >
      <Stack alignItems="center" gap={ 1.5 } pt={ 7.5 }>
        <NEWMLogo />
        <Typography color="white" component="h1" mt={ 10 } variant="h3">
          Oops, we&apos;re fine tuning our instruments!
        </Typography>
        <Typography
          color={ theme.colors.grey100 }
          component="h2"
          fontWeight={ 500 }
          variant="h4"
        >
          We&apos;re currently tweaking a few things backstage. We&apos;ll be
          back super soon!
        </Typography>
        <img
          alt={ "NEWM Monster" }
          height={ 250 }
          src={ getImageSrc(NEWMMonster) }
          style={ { marginTop: "28px" } }
          width={ 250 }
        />
      </Stack>
      <Stack
        alignItems="center"
        color={ theme.colors.grey100 }
        flexDirection="row"
        gap={ 1 }
        mb={ 5 }
        mt="auto"
      >
        <Typography
          component="h2"
          fontSize="14px"
          fontWeight={ 500 }
          variant="h4"
        >
          Wanna wait with us? We&apos;re all here.
        </Typography>
        <Link
          color={ theme.colors.grey100 }
          href={ NEWM_DISCORD_URL }
          rel="noopener"
          target="_blank"
        >
          <DiscordLogo />
        </Link>
      </Stack>
    </Stack>
  ) : (
    children
  );
};

export default Maintenance;
