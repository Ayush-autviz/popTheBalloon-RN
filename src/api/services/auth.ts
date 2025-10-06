import client from '../client'
import type { 
  AuthResponse, 
  SendPhoneOtpPayload, 
  RegisterPayload, 
  EmailVerifyPayload, 
  ResendEmailOtpPayload, 
  VerifyOtpPayload, 
  VerifyOtpResponse 
} from '../types/auth'

export async function sendPhoneOtp(payload: SendPhoneOtpPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/dating/auth/send-phone-otp', payload)
  return data
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/dating/auth/register', payload)
  return data
}

export async function emailVerify(payload: EmailVerifyPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/account/auth/main/dating/email-verification', payload)
  return data
}

export async function resendEmailOtp(payload: ResendEmailOtpPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/dating/auth/resend-email-otp', payload)
  return data
}

