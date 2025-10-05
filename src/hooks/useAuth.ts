import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { sendPhoneOtp, register, SendPhoneOtpPayload, RegisterPayload, AuthResponse,  emailVerify, resendEmailOtp, EmailVerifyPayload, ResendEmailOtpPayload } from '../api/services/auth'
import { useAuthStore } from '../store/authStore'

export function useSendPhoneOtp(): UseMutationResult<AuthResponse, Error, SendPhoneOtpPayload> {
  return useMutation<AuthResponse, Error, SendPhoneOtpPayload>({
    mutationFn: (payload: SendPhoneOtpPayload) => sendPhoneOtp(payload),
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