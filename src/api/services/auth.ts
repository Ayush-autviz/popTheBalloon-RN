import client from '../client'
import type { 
  AuthResponse, 
  SendPhoneOtpPayload, 
  PhoneVerificationPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  LoginPayload,
  RegisterPayload, 
  EmailVerifyPayload, 
  ResendEmailOtpPayload,
  PersonalInfoPayload,
  PersonalInfoResponse,
  PhotoUploadPayload,
  PhotoUploadResponse,
  BioAndVoicePayload,
  BioAndVoiceResponse,
} from '../types/auth'

export async function sendPhoneOtp(payload: SendPhoneOtpPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/dating/auth/send-phone-otp', payload)
  return data
}

export async function verifyPhoneOtp(payload: PhoneVerificationPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/dating/auth/phone-verification', payload)
  return data
}

export async function forgotPassword(payload: ForgotPasswordPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/dating/auth/forgot-password', payload)
  return data
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/dating/auth/reset-password', payload)
  return data
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/dating/auth/login', payload)
  return data
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/dating/auth/register', payload)
  return data
}

export async function emailVerify(payload: EmailVerifyPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/dating/auth/email-verification', payload)
  return data
}

export async function resendEmailOtp(payload: ResendEmailOtpPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/dating/auth/resend-email-verification', payload)
  return data
}

export async function updatePersonalInfo(payload: PersonalInfoPayload): Promise<PersonalInfoResponse> {
  const { data } = await client.post<PersonalInfoResponse>('/dating/profile/personal-info', payload)
  return data
}

export async function uploadPhoto(payload: PhotoUploadPayload | FormData): Promise<PhotoUploadResponse> {
  // For FormData, let axios set the Content-Type automatically
  // For regular objects, set JSON content type
  const config = payload instanceof FormData ? {} : {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const { data } = await client.post<PhotoUploadResponse>('/dating/profile/upload-photo', payload, config)
  return data
}

export async function updateBioAndVoice(payload: BioAndVoicePayload | FormData): Promise<BioAndVoiceResponse> {
  // For FormData, let axios set the Content-Type automatically
  // For regular objects, set JSON content type
  const config = payload instanceof FormData ? {} : {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const { data } = await client.post<BioAndVoiceResponse>('/dating/profile/bio-and-voice', payload, config)
  return data
}

