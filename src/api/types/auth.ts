export type AuthResponse = { 
  msg: string; 
  auth: { 
    success: boolean; 
    statusCode: number 
  }; 
  data: Record<string, unknown> 
};

export type SendPhoneOtpPayload = Readonly<{ 
  phoneNumber: string 
}>;

export type PhoneVerificationPayload = Readonly<{
  phoneNumber: string;
  otpCode: string;
}>;

export type ForgotPasswordPayload = Readonly<{
  email: string;
}>;

export type ResetPasswordPayload = Readonly<{
  email: string;
  verificationCode: string;
  newPassword: string;
  confirmPassword: string;
}>;

export type LoginPayload = Readonly<{
  email: string;
  password: string;
  loginType: string;
  googleToken?: string;
  appleToken?: string;
}>;

export type RegisterPayload = Readonly<{
  email: string
  password: string
  confirmPassword: string
  registerType: 'email'
}>;

export type EmailVerifyPayload = Readonly<{ 
  email: string; 
  verificationCode: string 
}>;

export type ResendEmailOtpPayload = Readonly<{ 
  email: string 
}>;

// Google Auth Types
export type GoogleSignInResult = {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    photo?: string;
  };
  error?: string;
};
