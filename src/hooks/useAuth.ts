import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { sendPhoneOtp, register, verifyOtp, SendPhoneOtpPayload, RegisterPayload, AuthResponse, VerifyOtpPayload, VerifyOtpResponse } from '../api/services/auth'
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

export function useAuth(): UseMutationResult<AuthResponse, Error, SendPhoneOtpPayload> {
  return useMutation<AuthResponse, Error, SendPhoneOtpPayload>({
    mutationFn: (payload: SendPhoneOtpPayload) => sendPhoneOtp(payload),
  })
}

export function useVerifyOtp(): UseMutationResult<VerifyOtpResponse, Error, VerifyOtpPayload> {
  return useMutation<VerifyOtpResponse, Error, VerifyOtpPayload>({
    mutationFn: (payload: VerifyOtpPayload) => verifyOtp(payload),
  })
}