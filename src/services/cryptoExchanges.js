import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "a9b5d7ae8amsh655dcfb68e83fbfp17fa18jsnade30c0c29ed",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = url => ({ url, headers: cryptoApiHeaders });

export const cryptoExchanges = createApi({
  reducerPath: "cryptoExchanges",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

export const { useGetExchangesQuery } = cryptoExchanges;
