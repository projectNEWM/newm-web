import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "buildParams";
import { setToastMessage } from "modules/ui";
import { camelCase, last } from "lodash";
import { transformKeys } from "common";
import { removeFirstCharIfNumber } from "common/stringUtils";
import { receiveAdaUsdRate } from "modules/wallet/slice";
import { AdaUsdResponse } from "./types";

const apiKey = process.env.ALPHA_ADVANTAGE_API_KEY;

const api = createApi({
  reducerPath: "alphaAdvantageApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrls.alphaAdvantage }),
  endpoints: (build) => ({
    getAdaUsdRate: build.query<string, void>({
      query: () => ({
        url: `query?function=CRYPTO_INTRADAY&symbol=ADA&market=USD&interval=5min&apikey=${apiKey}`,
        method: "GET",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
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

        const formatted = transformKeys(response, transform) as AdaUsdResponse;

        const recentData = last(Object.values(formatted.timeSeriesCrypto5Min));

        if (!recentData) {
          throw new Error("Error fetching ADA/USD rate from Alpha Advantage");
        }

        return recentData.close;
      },
    }),
  }),
});

export default api;
