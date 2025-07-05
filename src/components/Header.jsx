import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import {
  toggleGptSearch,
  setGptSearch,
  setSearchTitle,
  setMovieResults,
} from "../utils/gptSlice";
import { setLang } from "../utils/configLang";

const Header = () => {
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const on = location.pathname === "/browse" ? true : false;
  const handelSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setGptSearch(false));
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");

        // ...
      }
    });
    return () => unsubscribe();
  }, []);

  const handelGptSearchClick = () => {
    dispatch(toggleGptSearch());
    dispatch(setSearchTitle(null));
    dispatch(setMovieResults(null));
  };

  const handleLanguageChange = (e) => {
    dispatch(setLang(e.target.value));
  };

  if (!user && location.pathname === "/browse") return null;

  return (
    <div className=" absolute z-20 w-full px-4 md:px-6 py-2 bg-gradient-to-b from-black flex  md:flex-row justify-between top-[0.1px]">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="Logo" />
      {on && (
        <div className="flex items-center space-x-2 text-white relative">
          {showGptSearch && (
            <select
              className="bg-gray-600 text-white rounded-md p-2  hidden  md:block cursor-pointer"
              onChange={handleLanguageChange}
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
            </select>
          )}

          <button
            className="py-2 px-4 md:mx-3 mx-2  bg-gray-600 rounded-md cursor-pointer"
            onClick={handelGptSearchClick}
          >
            {showGptSearch ? "HomePage" : "Gpt Search"}
          </button>

          {/* Profile Dropdown */}
          <div ref={dropdownRef} className="relative">
            <img
              onClick={() => setShowDropdown((prev) => !prev)}
              className="w-9 h-9 md:h-10 md:w-10 cursor-pointer rounded-full"
              src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"
              alt="profile"
            />

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-black text-white border border-gray-700 rounded-md shadow-lg p-3 z-50 w-40">
                <p className="text-sm mb-2">👤 {user.displayName}</p>
                <button
                  onClick={handelSignOut}
                  className="bg-red-600 w-full py-1 text-sm rounded-md hover:bg-red-700"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
