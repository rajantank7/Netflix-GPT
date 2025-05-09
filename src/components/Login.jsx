import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignIn, setisSignIn] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleBtnClick = () => {
    const nameValue = isSignIn ? null : name.current.value;

    const message = checkValidData(
      email.current.value,
      password.current.value,
      nameValue,
      isSignIn
    );
    setError(message);
    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL:
              "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=1000&auto=format&fit=crop&q=60",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
              console.log(" updated");
            })
            .catch((error) => {
              // An error occurred
              // ...
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setError(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log(errorCode, errorMessage);
          setError(errorMessage);
        });
    }
  };

  const toggleSignInToSignUp = () => {
    setisSignIn(!isSignIn);
    setError(null);
    email.current.value = "";
    password.current.value = "";
  };
  return (
    <div>
      <Header />

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-100  my-30 mx-auto left-0 right-0 bg-black text-white p-12 z-1 opacity-86 "
      >
        <h1 className="text-3xl font-bold mb-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 my-3 w-full border border-white/50 "
          />
        )}
        {error == "Name is not valid" && !isSignIn && (
          <p className="text-red-600 font-bold">{error}</p>
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-3 my-3 w-full border border-white/50 "
        />
        {error == "Email Id not valid" && (
          <p className="text-red-600  font-bold">{error}</p>
        )}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 my-3 w-full border border-white/50"
        />
        {error == "Password is not valid" && (
          <p className="text-red-600  font-bold">{error}</p>
        )}
        {error &&
          error !== "Email Id not valid" &&
          error !== "Password is not valid" &&
          error !== "Name is not valid" && (
            <p className="text-red-600 font-bold">{error}</p>
          )}

        <button
          className=" bg-red-700 p-2 w-full my-3 cursor-pointer"
          onClick={handleBtnClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="my-5 cursor-pointer" onClick={toggleSignInToSignUp}>
          {isSignIn ? (
            <>
              <span className="text-gray-400">New to Netflix?</span>
              <span className="text-white font-bold"> Sign Up now!</span>
            </>
          ) : (
            <>
              <span className="text-gray-400">Already have an account?</span>
              <span className="text-white font-bold"> Sign In</span>
            </>
          )}
        </p>
      </form>

      <img className="h-screen w-screen" src={BG_URL} />
    </div>
  );
};

export default Login;
