import { GoogleSignin } from '@react-native-google-signin/google-signin';
import type { GoogleSignInResult } from '../types/auth';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '213635557263-n6jft5qiefon9o19doglc6l83ru8pn50.apps.googleusercontent.com',
});

export async function signInWithGoogle(): Promise<GoogleSignInResult> {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();

    // Try the new style of google-sign in result, from v13+ of that module
    let idToken = signInResult.data?.idToken;
    if (!idToken) {
      // if you are using older versions of google-signin, try old style result
      idToken = (signInResult as any).idToken;
    }
    if (!idToken) {
      throw new Error('No ID token found');
    }

    // Create a Google credential with the token
   // const googleCredential = GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
   // const firebaseUser = await signInWithCredential(getAuth(), googleCredential);
    
     return {
      success: true,
      user: {
        id: '123',
        email: 'test@test.com',
        name: 'Test User',
      },
    };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Google Sign-In failed',
    };
  }
}

export async function signOutFromGoogle(): Promise<void> {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error('Google Sign-Out Error:', error);
  }
}
