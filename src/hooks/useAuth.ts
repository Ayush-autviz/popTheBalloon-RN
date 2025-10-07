import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { 
  sendPhoneOtp, 
  verifyPhoneOtp,
  forgotPassword,
  resetPassword,
  login,
  register, 
  emailVerify, 
  resendEmailOtp 
} from '../api/services/auth'
import { useAuthStore } from '../store/authStore'
import type { 
  SendPhoneOtpPayload, 
  PhoneVerificationPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  LoginPayload,
  RegisterPayload, 
  AuthResponse, 
  EmailVerifyPayload, 
  ResendEmailOtpPayload 
} from '../api/types/auth'

export function useSendPhoneOtp(): UseMutationResult<AuthResponse, Error, SendPhoneOtpPayload> {
  return useMutation<AuthResponse, Error, SendPhoneOtpPayload>({
    mutationFn: (payload: SendPhoneOtpPayload) => sendPhoneOtp(payload),
  })
}

export function useVerifyPhoneOtp(): UseMutationResult<AuthResponse, Error, PhoneVerificationPayload> {
  return useMutation<AuthResponse, Error, PhoneVerificationPayload>({
    mutationFn: (payload: PhoneVerificationPayload) => verifyPhoneOtp(payload),
  })
}

export function useForgotPassword(): UseMutationResult<AuthResponse, Error, ForgotPasswordPayload> {
  return useMutation<AuthResponse, Error, ForgotPasswordPayload>({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
  })
}

export function useResetPassword(): UseMutationResult<AuthResponse, Error, ResetPasswordPayload> {
  return useMutation<AuthResponse, Error, ResetPasswordPayload>({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
  })
}

export function useLogin(): UseMutationResult<AuthResponse, Error, LoginPayload> {
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: (payload: LoginPayload) => login(payload),
  })
}

export function useRegister(): UseMutationResult<AuthResponse, Error, RegisterPayload> {
  return useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: (payload: RegisterPayload) => register(payload),
  })
}

export function useLogout(): () => void {
  const setToken = useAuthStore((s) => s.setToken)
  return () => setToken(null)
}

export function useEmailVerify(): UseMutationResult<AuthResponse, Error, EmailVerifyPayload> {
  return useMutation<AuthResponse, Error, EmailVerifyPayload>({
    mutationFn: (payload: EmailVerifyPayload) => emailVerify(payload),
  })
}

export function useResendEmailOtp(): UseMutationResult<AuthResponse, Error, ResendEmailOtpPayload> {
  return useMutation<AuthResponse, Error, ResendEmailOtpPayload>({
    mutationFn: (payload: ResendEmailOtpPayload) => resendEmailOtp(payload),
  })
}