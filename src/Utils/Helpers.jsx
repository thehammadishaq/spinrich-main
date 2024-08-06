import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/FirebaseConfig";

const IsUserSignedIn = () => {
  const [isLogedIn, setisLogedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setisLogedIn(true);
      } else {
        setisLogedIn(false);
      }
    });
  }, [auth]);
  return isLogedIn;
};

export { IsUserSignedIn };
