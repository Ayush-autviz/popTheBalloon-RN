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

export type RegisterPayload = Readonly<{
  email: string
  password: string
  confirmPassword: string
  registerType: 'email'
}>;

export type EmailVerifyPayload = Readonly<{ 
  email: string; 
  verificationCode: number 
}>;

export type ResendEmailOtpPayload = Readonly<{ 
  email: string 
}>;

export type VerifyOtpPayload = Readonly<{ 
  code: string 
}>;

export type VerifyOtpResponse = Readonly<{ 
  success: boolean 
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
