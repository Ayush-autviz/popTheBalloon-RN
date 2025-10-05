import client from '../client'
export type AuthResponse = { msg: string; auth: { success: boolean; statusCode: number }; data: Record<string, unknown> };
export type SendPhoneOtpPayload = Readonly<{ phoneNumber: string }>
// export type AuthResponse = Readonly<{ token: string }>
export type RegisterPayload = Readonly<{
  email: string
  password: string
  confirmPassword: string
  registerType: 'email'
}>
export type EmailVerifyPayload = Readonly<{ email: string; verificationCode: number }>
export type ResendEmailOtpPayload = Readonly<{ email: string }>

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

export async function emailVerify(payload: EmailVerifyPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/account/auth/main/dating/email-verification', payload)
  return data
}

export async function resendEmailOtp(payload: ResendEmailOtpPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/dating/auth/resend-email-otp', payload)
  return data
}

