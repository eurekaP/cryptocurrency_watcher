import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const cryptoApiHeaders = {
//     "x-rapidapi-host": "coinranking1.p.rapidapi.com",
//     "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
// };

const baseUrl = "https://api.coinranking.com/v2";

const createRequest = url => ({ url });

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        getCryptos: builder.query({
            query: count => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: coinId => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) =>
                createRequest(`coin/${coinId}/history/${timePeriod}`),
        }),
    }),
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi;
