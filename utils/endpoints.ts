export enum ApiRoutes {
  Test = "/test",
  RequestOtp = "/auth/request-otp",
  VerifyOtp = "/auth/verify-otp",
  SignUp = "/auth/sign-up",
  SignIn = "/auth/sign-in",
  RequestPasswordReset = "/auth/request-password-reset",
  ResetPassword = "/auth/reset-password",
}

export const ApiMetadata: Record<ApiRoutes, { methods: string[] }> = {
  [ApiRoutes.Test]: { methods: ["GET"] },
  [ApiRoutes.RequestOtp]: { methods: ["POST"] },
  [ApiRoutes.VerifyOtp]: { methods: ["GET"] },
  [ApiRoutes.SignUp]: { methods: ["POST"] },
  [ApiRoutes.SignIn]: { methods: ["POST"] },
  [ApiRoutes.RequestPasswordReset]: { methods: ["GET"] },
  [ApiRoutes.ResetPassword]: { methods: ["POST"] },
};
