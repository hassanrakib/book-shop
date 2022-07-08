import {
  // import getAuth to use the firebase authentication service
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import initializeFirebaseApp from "../Firebase/firebase.init";

/* Firebase App is a container like object that stores conmmon configureations and shares authentication across firebas services. 
After we initialize firebase, we can use firebase services. */
const app = initializeFirebaseApp();

const useFirebase = () => {
  const auth = getAuth(app);

  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // google sign in using redirect
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    // redirect the user to sign in with google
    signInWithRedirect(auth, googleProvider);
  };

  // get sign in info after redirection from google
  useEffect(() => {
    const unsubscribed = getRedirectResult(auth)
      .then((result) => {
        // The signed-in user info.
        const newUser = result.user;
        setUser(newUser);
      })
      .catch((err) => {
        console.log("Error happened");
      })
      .finally(() => setIsLoading(false));

    return () => unsubscribed;
  }, []);

  // observer to get the currently signed in user
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });

    // stop the observer when any component that uses this unmounts
    return () => unsubscribed;
  });

  // sign out from firebase authentication system
  const signOutTheUser = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    googleSignIn,
    signOutTheUser,
    setIsLoading,
    setError,
    setUser,
    auth,
    isLoading,
    user,
    error,
  };
};

export default useFirebase;
