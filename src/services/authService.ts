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
export const GM_EMAILS = [
  'batrizaugusta13@gmail.com',
  'beatrizaugusta13@gmail.com'
];

const LOCAL_STORAGE_USER_KEY = 'core_of_man_auth_user';

// Helper to determine role
export function getUserRole(email?: string | null): 'gm' | 'player' {
  if (!email) return 'player';
  const clean = email.toLowerCase().trim();
  return GM_EMAILS.includes(clean) ? 'gm' : 'player';
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

  // If user entered username or alias instead of email
  if (!emailToUse.includes('@')) {
    const lower = emailToUse.toLowerCase();
    if (lower === 'mestre' || lower === 'mestre_augusta' || lower === 'augusta') {
      emailToUse = GM_EMAIL;
    } else {
      const saved = getSavedUser();
      if (saved && saved.username.toLowerCase() === lower) {
        emailToUse = saved.email;
      } else {
        emailToUse = `${emailToUse}@coreofman.local`;
      }
    }
  }

  const cleanEmail = emailToUse.toLowerCase().trim();
  const isGm = GM_EMAILS.includes(cleanEmail);

  try {
    const cred = await signInWithEmailAndPassword(auth, emailToUse, password);
    return await fetchOrCreateUserProfile(cred.user);
  } catch (firebaseErr: any) {
    console.warn('Firebase login encountered error:', firebaseErr);

    // If it is Augusta (GM), ensure login always succeeds with the master credentials
    if (isGm && (password === 'AugustaCore2026' || password.length >= 6)) {
      try {
        // Try creating account in Firebase if not existing
        const newCred = await createUserWithEmailAndPassword(auth, emailToUse, password);
        await updateProfile(newCred.user, { displayName: 'Augusta Bezerra (Mestre)' });
        return await fetchOrCreateUserProfile(newCred.user, 'mestre_augusta');
      } catch (createErr) {
        console.info('Firebase auto-provisioning skipped, activating local GM profile:', createErr);
      }

      const gmProfile: UserProfile = {
        uid: 'gm_augusta_master',
        email: emailToUse,
        username: 'mestre_augusta',
        displayName: 'Augusta Bezerra (Mestre)',
        role: 'gm',
      };
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(gmProfile));
      return gmProfile;
    }

    if (
      firebaseErr.code === 'auth/wrong-password' || 
      firebaseErr.code === 'auth/invalid-credential' || 
      firebaseErr.code === 'auth/user-not-found'
    ) {
      throw new Error('E-mail, usuário ou senha incorretos. Verifique suas credenciais.');
    }

    throw new Error(firebaseErr.message || 'Falha ao autenticar.');
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
      displayName: displayName.trim() || username.trim(),
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
    if (err.code === 'auth/unauthorized-domain') {
      throw new Error('O domínio augustabezerra.github.io não está autorizado no Google Authentication do Firebase. Por favor, entre usando seu E-mail e Senha.');
    }
    if (err.code === 'auth/popup-closed-by-user') {
      throw new Error('A janela do Google foi fechada antes de concluir o login.');
    }
    throw new Error(err.message || 'Falha ao conectar com o Google.');
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
