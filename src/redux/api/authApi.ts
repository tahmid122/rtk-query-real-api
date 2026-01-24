import { TSignUp } from "@/types/signup";
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
    signupUser: builder.mutation<{ success: boolean }, TSignUp>({
      query: (userInfo) => {
        return {
          url: "/auth/otp/signup",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    verifyOtp: builder.mutation<
      { success: boolean },
      { email: string; otp: string }
    >({
      query: (info) => {
        return {
          url: "/auth/otp/verify-email",
          method: "POST",
          body: info,
        };
      },
    }),
  }),
});
export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useVerifyOtpMutation,
} = loginApi;
