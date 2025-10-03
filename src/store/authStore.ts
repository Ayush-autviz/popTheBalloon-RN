import { create } from 'zustand'

export type AuthState = Readonly<{
  token: string | null
  setToken: (token: string | null) => void
}>

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token: string | null) => set({ token }),
}))

