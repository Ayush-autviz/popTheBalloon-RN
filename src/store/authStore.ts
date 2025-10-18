import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { UserPref } from '../api/types/auth'

export type AuthState = Readonly<{
  token: string | null
  userPref: UserPref | null
  isAuthenticated: boolean
  onboardingCompleted: boolean
  setToken: (token: string | null) => void
  setUserPref: (userPref: UserPref | null) => void
  setAuthData: (token: string, userPref: UserPref) => void
  setOnboardingCompleted: (completed: boolean) => void
  clearAuth: () => void
}>

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userPref: null,
      isAuthenticated: false,
      onboardingCompleted: false,
      setToken: (token: string | null) => set({
        token,
        isAuthenticated: !!token
      }),
      setUserPref: (userPref: UserPref | null) => set({ userPref }),
      setAuthData: (token: string, userPref: UserPref) => set({
        token,
        userPref,
        isAuthenticated: true
      }),
      setOnboardingCompleted: (completed: boolean) => set({ onboardingCompleted: completed }),
      clearAuth: () => set({
        token: null,
        userPref: null,
        isAuthenticated: false,
        onboardingCompleted: false
      }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        token: state.token,
        userPref: state.userPref,
        isAuthenticated: state.isAuthenticated,
        onboardingCompleted: state.onboardingCompleted
      }),
    }
  )
)

