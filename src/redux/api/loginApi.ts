import { baseApi } from "./baseApi";

const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/otp/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
  }),
});
export const { useLoginUserMutation } = loginApi;
