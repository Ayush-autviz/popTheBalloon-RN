import client from '../client'

export type SendPhoneOtpPayload = Readonly<{ phoneNumber: string }>
export type AuthResponse = Readonly<{ token: string }>
export type RegisterPayload = Readonly<{
  email: string
  password: string
  confirmPassword: string
  registerType: 'email'
}>

export type VerifyOtpPayload = Readonly<{ code: string }>
export type VerifyOtpResponse = Readonly<{ success: boolean }>

export async function sendPhoneOtp(payload: SendPhoneOtpPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/dating/auth/send-phone-otp', payload)
  return data
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/dating/auth/register', payload)
  return data
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<VerifyOtpResponse> {
  const { data } = await client.post<VerifyOtpResponse>('/dating/auth/verify-otp', payload)
  return data
}

