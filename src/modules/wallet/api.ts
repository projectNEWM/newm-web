import { alphaAdvantageApi as api } from "api";
import { setToastMessage } from "modules/ui";
import { camelCase } from "lodash";
import { transformKeys } from "common";
import { removeFirstCharIfNumber } from "common/stringUtils";
import { AdaUsdRateResponse } from "./types";
import { receiveAdaUsdRate } from "./slice";

const apiKey = process.env.ALPHA_ADVANTAGE_API_KEY;

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdaUsdRate: build.query<AdaUsdRateResponse, void>({
      query: () => ({
        url: `query?function=CRYPTO_INTRADAY&symbol=ADA&market=USD&interval=5min&apikey=${apiKey}`,
        method: "GET",
      }),

      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveAdaUsdRate(data));
        } catch (err) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching ADA price data",
              severity: "error",
            })
          );
        }
      },

      // eslint-disable-next-line
      transformResponse: (response: any) => {
        // transform response to have camel case keys without leading number
        const transform = (val: string) => {
          return camelCase(removeFirstCharIfNumber(val));
        };

        return transformKeys(response, transform) as AdaUsdRateResponse;
      },
    }),
  }),
});

export const { useGetAdaUsdRateQuery } = extendedApi;

export default extendedApi;
