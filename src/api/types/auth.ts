export type UserPref = {
  email: string;
  firstName: string;
  lastName: string;
  registrationStep: number;
  registrationCompleted: boolean;
};

export type AuthResponse = { 
  msg: string;
  auth: { 
    success: boolean; 
    statusCode?: number;
    token?: string;
  }; 
  data: {
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    registrationStep?: number;
    registrationCompleted?: boolean;
    emailVerified?: boolean;
    message?: string;
    token?: string;
    userPref?: UserPref;
    [key: string]: unknown;
  };
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

// Personal Info Types
export type PersonalInfoPayload = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  location: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    city: string;
    state: string;
    country: string;
  };
};

export type PersonalInfoResponse = {
  msg: string;
  auth: { success: boolean };
  data: {
    personalInfoUpdated: boolean;
    registrationStep: number;
  };
};

// Photo Upload Types
export type PhotoUploadPayload = {
  photoIndex: number;
  isPrimary: boolean;
} | FormData;

export type PhotoUploadResponse = {
  msg: string;
  auth: { success: boolean };
  data: {
    photoUploaded: boolean;
    photoId: string;
    s3Key: string;
    registrationStep: number;
  };
};

// Bio and Voice Types
export type BioAndVoicePayload = {
  bio: string;
} | FormData;

export type BioAndVoiceResponse = {
  msg: string;
  auth: { success: boolean };
  data: {
    bioUpdated: boolean;
    voiceRecordingUploaded: boolean;
    registrationStep: number;
    registrationCompleted: boolean;
  };
};
