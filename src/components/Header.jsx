import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
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
    <div className=" absolute z-20 w-full px-8 py-2 bg-gradient-to-b from-black flex justify-between top-[0.1px]">
      <img className="w-44" src={LOGO} alt="Logo" />
      {on == true && (
        <div className="flex items-center space-x-2 text-white ">
          {showGptSearch && (
            <select
              className="bg-gray-600 text-white rounded-md p-2 cursor-pointer"
              onChange={handleLanguageChange}
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 bg-gray-600 rounded-md cursor-pointer"
            onClick={handelGptSearchClick}
          >
            {showGptSearch ? "HomePage" : "Gpt Search"}
          </button>
          <img
            className="w-10 h-10 cursor-pointer mr-15"
            src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"
            alt=""
          />

          <p className="absolute top-5 right-10">User- {user.displayName}</p>
          <br />

          <button
            onClick={handelSignOut}
            className="cursor-pointer relative top-3 right-6 px-2 bg-red-600 text-white rounded-md"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
