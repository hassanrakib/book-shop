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
        const userFromFirebase = result.user;
        // save new user to db
        const newUser = {
          uid: userFromFirebase.uid,
          displayName: userFromFirebase.displayName,
          email: userFromFirebase.email,
          photoURL: userFromFirebase.photoURL,
          cart: [],
        };

        // set the user
        setUser(newUser);

        // save new user to database
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser)
        });
      })
      .catch((err) => {
        // No need
      })
      .finally(() => setIsLoading(false));

    return () => unsubscribed;
  }, [auth]);

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
