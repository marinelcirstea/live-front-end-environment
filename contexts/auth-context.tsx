import { createContext, useContext, useEffect, useState } from "react";
import app from "services/firebase";
import {
  setPersistence,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  getAuth,
  browserLocalPersistence,
  User,
} from "firebase/auth";

const auth = getAuth(app);

export interface IAuthContext {
  user: User | null;
  login: () => void;
  logout: () => void;
}
const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) setUser(null);

      setUser(user);
    });

    return unsubscribe;
  }, []);

  const login = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, new GithubAuthProvider());
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
