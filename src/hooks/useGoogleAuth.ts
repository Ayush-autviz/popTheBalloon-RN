import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { signInWithGoogle, signOutFromGoogle } from '../api/services/googleAuth';
import { useAuthStore } from '../store/authStore';
import type { GoogleSignInResult } from '../api/types/auth';

export function useGoogleSignIn(): UseMutationResult<GoogleSignInResult, Error, void> {
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation<GoogleSignInResult, Error, void>({
    mutationFn: () => signInWithGoogle(),
    onSuccess: (result) => {
      if (result.success && result.user) {
        // Store the user ID as token for now - you might want to get a proper JWT from your backend
        setToken(result.user.id);
      }
    },
  });
}

export function useGoogleSignOut(): () => void {
  const setToken = useAuthStore((s) => s.setToken);
  
  return () => {
    signOutFromGoogle();
    setToken(null);
  };
}
