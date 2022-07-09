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
        // get the user from firebase
        const userFromFirebase = result.user;

        // save new user to db & user variable
        const newUser = {
          uid: userFromFirebase.uid,
          displayName: userFromFirebase.displayName,
          email: userFromFirebase.email,
          photoURL: userFromFirebase.photoURL,
          cart: [],
        };

        // if a user already exists in db, don't save him
        fetch(`http://localhost:5000/users/${newUser.uid}`)
          .then((res) => res.json())
          .then((userFromDB) => {
            // if found set the user variable to user from db
            if (userFromDB.uid == newUser.uid) {
              setUser(userFromDB);
            }
          })
          .catch(() => {
            // if not found save new user to database and to user variable for current use
            setUser(newUser);
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => console.log(data.acknowledged));
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
        // get the user from DB and set to user variable
        fetch(`http://localhost:5000/users/${user.uid}`)
          .then((res) => res.json())
          .then((userFromDB) => {
            if (userFromDB.uid == user.uid) {
              setUser(userFromDB);
              console.log(userFromDB);
            }
          }).finally(() => setIsLoading(false));
      } else {
        setUser({});
      }
      // setIsLoading(false);
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
