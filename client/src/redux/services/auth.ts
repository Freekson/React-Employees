import { User } from "@prisma/client";
import { api } from "./api";

export type UserData = Omit<User, "id">;
type ResponseLoginData = User & { token: string };

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseLoginData, UserData>({
      query: (UserData) => ({
        url: "/user/login",
        method: "POST",
        body: UserData,
      }),
    }),
    register: builder.mutation<ResponseLoginData, UserData>({
      query: (UserData) => ({
        url: "/user/register",
        method: "POST",
        body: UserData,
      }),
    }),
    current: builder.query<ResponseLoginData, UserData>({
      query: () => ({
        url: "/user/current",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } =
  authApi;
export const {
  endpoints: { login, register, current },
} = authApi;
