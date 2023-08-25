import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuerry = fetchBaseQuery({
  baseUrl: "http://locallhost:8000/api",
});

const baseQuerryWithRetry = retry(baseQuerry, { maxRetries: 3 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQuerryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
