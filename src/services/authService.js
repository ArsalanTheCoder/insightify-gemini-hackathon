import auth from '@react-native-firebase/auth';

/* ---------------- EMAIL & PASSWORD AUTH ---------------- */

export const registerWithEmail = async (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const loginWithEmail = async (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const resetPassword = async (email) => {
  return auth().sendPasswordResetEmail(email);
};

export const logout = async () => {
  return auth().signOut();
};

export const getCurrentUser = () => {
  return auth().currentUser;
};

export const onAuthStateChange = (callback) => {
  return auth().onAuthStateChanged(callback);
};
