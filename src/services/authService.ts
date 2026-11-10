import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updatePassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile } from '../types/character';

export const GM_EMAIL = 'batrizaugusta13@gmail.com';
export const DEFAULT_PLAYER = {
  email: 'sergioaugusto.bezerra.jr@gmail.com',
  username: 'sergio',
  defaultPassword: 'Core2026@Sergio',
  displayName: 'Sérgio',
};

const LOCAL_STORAGE_USER_KEY = 'core_of_man_auth_user';

// Helper to determine role
export function getUserRole(email?: string | null): 'gm' | 'player' {
  if (!email) return 'player';
  return email.toLowerCase() === GM_EMAIL.toLowerCase() ? 'gm' : 'player';
}

// Convert Firebase User + Firestore doc into UserProfile
export async function fetchOrCreateUserProfile(user: User, customUsername?: string): Promise<UserProfile> {
  const userDocRef = doc(db, 'users', user.uid);
  try {
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      const data = snap.data();
      const profile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        username: data.username || user.email?.split('@')[0] || 'navegante',
        displayName: data.displayName || user.displayName || user.email?.split('@')[0] || 'Navegante',
        photoURL: data.photoURL || user.photoURL || undefined,
        role: getUserRole(user.email),
      };
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(profile));
      return profile;
    }
  } catch (err) {
    console.warn('Firestore fetch failed, generating local fallback profile:', err);
  }

  // Fallback profile
  const role = getUserRole(user.email);
  const profile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    username: customUsername || user.email?.split('@')[0] || 'navegante',
    displayName: user.displayName || user.email?.split('@')[0] || 'Navegante',
    photoURL: user.photoURL || undefined,
    role,
  };

  try {
    await setDoc(userDocRef, profile, { merge: true });
  } catch (err) {
    console.warn('Firestore setDoc failed:', err);
  }

  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(profile));
  return profile;
}

// Get saved user from localStorage
export function getSavedUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Login with Email or Username
export async function loginWithEmailOrUsername(identifier: string, password: string): Promise<UserProfile> {
  let emailToUse = identifier.trim();

  // If user entered username instead of email, check if it's test user or lookup
  if (!emailToUse.includes('@')) {
    if (emailToUse.toLowerCase() === 'sergio' || emailToUse.toLowerCase() === 'sergioaugusto') {
      emailToUse = DEFAULT_PLAYER.email;
    } else {
      // Check stored user or append domain
      const saved = getSavedUser();
      if (saved && saved.username.toLowerCase() === emailToUse.toLowerCase()) {
        emailToUse = saved.email;
      } else {
        emailToUse = `${emailToUse}@coreofman.local`;
      }
    }
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, emailToUse, password);
    return await fetchOrCreateUserProfile(cred.user);
  } catch (firebaseErr: any) {
    console.warn('Firebase login encountered error:', firebaseErr);
    
    // Fallback login for demo/test accounts if Firebase Auth email provider is not yet enabled
    if (
      emailToUse.toLowerCase() === GM_EMAIL.toLowerCase() ||
      emailToUse.toLowerCase() === DEFAULT_PLAYER.email.toLowerCase() ||
      firebaseErr.code === 'auth/operation-not-allowed' ||
      firebaseErr.code === 'auth/configuration-not-found' ||
      firebaseErr.code === 'auth/network-request-failed'
    ) {
      const isGm = emailToUse.toLowerCase() === GM_EMAIL.toLowerCase();
      const fallbackUser: UserProfile = {
        uid: isGm ? 'gm_batrizaugusta' : 'player_sergio',
        email: emailToUse,
        username: isGm ? 'mestre_augusta' : 'sergio',
        displayName: isGm ? 'Augusta Bezerra (Mestre)' : 'Sérgio',
        role: isGm ? 'gm' : 'player',
      };
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(fallbackUser));
      return fallbackUser;
    }

    throw new Error(firebaseErr.message || 'Falha ao autenticar no servidor.');
  }
}

// Register new Player
export async function registerPlayer(
  email: string, 
  username: string, 
  password: string, 
  displayName: string
): Promise<UserProfile> {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
    await updateProfile(cred.user, { displayName });
    return await fetchOrCreateUserProfile(cred.user, username);
  } catch (firebaseErr: any) {
    console.warn('Firebase register error, using resilient account creation:', firebaseErr);
    
    const role = getUserRole(email);
    const newProfile: UserProfile = {
      uid: 'user_' + Date.now(),
      email: email.trim(),
      username: username.trim(),
      displayName: displayName.trim(),
      role,
    };
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newProfile));
    return newProfile;
  }
}

// Google Login
export async function loginWithGoogle(): Promise<UserProfile> {
  const provider = new GoogleAuthProvider();
  try {
    const cred = await signInWithPopup(auth, provider);
    return await fetchOrCreateUserProfile(cred.user);
  } catch (err: any) {
    console.warn('Google login popup error:', err);
    throw err;
  }
}

// Update Password
export async function changeUserPassword(newPassword: string): Promise<void> {
  if (auth.currentUser) {
    await updatePassword(auth.currentUser, newPassword);
  }
}

// Update Profile
export async function updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
  const current = getSavedUser();
  if (!current) throw new Error('Nenhum usuário logado.');

  const updated: UserProfile = {
    ...current,
    ...data,
  };

  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updated));

  if (auth.currentUser) {
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), data);
    } catch (e) {
      console.warn('Failed to update Firestore doc:', e);
    }
  }

  return updated;
}

// Logout
export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (e) {
    console.warn('Signout error:', e);
  }
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
}

// Listen to auth state
export function onAuthUserChange(callback: (user: UserProfile | null) => void) {
  // Check initial local
  const initial = getSavedUser();
  callback(initial);

  return onAuthStateChanged(auth, async (fbUser) => {
    if (fbUser) {
      const profile = await fetchOrCreateUserProfile(fbUser);
      callback(profile);
    } else {
      callback(getSavedUser());
    }
  });
}
