import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setisSignIn] = useState(true);
  const toggleSignInToSignUp = () => {
    setisSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />

      <form className="absolute w-100  my-30 mx-auto left-0 right-0 bg-black text-white p-12 z-1 opacity-86 ">
        <h1 className="text-3xl font-bold mb-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 my-3 w-full border border-white/50 "
          />
        )}
        <input
          type="text"
          placeholder="Email"
          className="p-3 my-3 w-full border border-white/50 "
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 my-3 w-full border border-white/50"
        />
        <button className=" bg-red-700 p-2 w-full my-3 cursor-pointer">
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="my-5 cursor-pointer" onClick={toggleSignInToSignUp}>
          {isSignIn ? (
            <div>
              <span className="text-gray-400">New to Netflix?</span>
              <span className="text-white font-bold"> Sign Up now!</span>
            </div>
          ) : (
            <div>
              <span className="text-gray-400">Already have an account?</span>
              <span className="text-white font-bold"> Sign In</span>
            </div>
          )}
        </p>
      </form>

      <img
        className="h-screen w-screen"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web/IN-en-20250421-TRIFECTA-perspective_dc5bcfdf-88a5-4972-8ffe-b28ff942f76e_large.jpg"
      />
    </div>
  );
};

export default Login;
