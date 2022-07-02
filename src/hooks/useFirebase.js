import {
  // import getAuth to use the firebase authentication service
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
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

  // google sign in using redirect
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    // redirect the user to sign in with google
    signInWithRedirect(auth, googleProvider);
  };

  useEffect(() => {
    //  get the oauth token of the google provider
    getRedirectResult(auth)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }, []);

  // observer to get the currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
  });

  // sign out from firebase authentication system
  const signOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return { googleSignIn, signOut, user, error };
};

export default useFirebase;