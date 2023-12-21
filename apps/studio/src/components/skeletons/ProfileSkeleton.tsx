import { Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

const ProfileSkeleton: FunctionComponent = () => {
  return (
    <>
      <Skeleton height={ 40 } variant="rectangular" />
      <br />
      <Skeleton height={ 200 } variant="rectangular" />
      <br />

      <Stack
        alignItems="center"
        columnGap={ 3 }
        flexDirection={ ["column", "column", "column", "row"] }
        rowGap={ 2 }
      >
        <Skeleton
          sx={ { height: [100, 100, 200], width: [100, 100, 200] } }
          variant="circular"
        />

        <Stack sx={ { alignItems: ["center", "unset"] } }>
          <Skeleton
            height={ 24 }
            sx={ { width: [150, 250, 300] } }
            variant="rectangular"
          />
          <br />
          <Skeleton
            height={ 14 }
            sx={ { width: [50, 100, 150] } }
            variant="rectangular"
          />
          <br />
          <Skeleton sx={ { width: [100, 150, 200] } } variant="rectangular" />
        </Stack>
        <Stack
          alignSelf={ [null, null, null, "flex-start"] }
          columnGap={ 2 }
          flexDirection="row"
          justifyContent="flex-end"
          marginLeft={ [null, null, null, "auto"] }
        >
          <Skeleton height={ 40 } variant="rectangular" width={ 40 } />
          <Skeleton height={ 40 } variant="rectangular" width={ 40 } />
          <Skeleton height={ 40 } variant="rectangular" width={ 40 } />
        </Stack>
      </Stack>

      <Stack
        sx={ {
          columnGap: [2, 3, 5],
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        } }
      >
        { Array.from(new Array(20)).map((item, index) => (
          <Stack key={ index } marginRight={ 0.5 } my={ 5 } width={ [150, 200] }>
            <Skeleton
              height={ 118 }
              sx={ { width: [150, 200] } }
              variant="rectangular"
            />

            <Stack pt={ 0.5 }>
              <Skeleton />
              <Skeleton width="60%" />
            </Stack>
          </Stack>
        )) }
      </Stack>
    </>
  );
};

export default ProfileSkeleton;
