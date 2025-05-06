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

const Header = () => {
  const location = useLocation();
  const user = useSelector((store) => store.user);

  const on = location.pathname === "/browse" ? true : false;
  const handelSignOut = () => {
    signOut(auth)
      .then(() => {
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
  return (
    <>
      {location.pathname === "/browse" && (
        <div className=" absolute z-20 w-full px-8 py-2 bg-gradient-to-b from-black flex justify-between top-[2px]">
          <img className="w-44" src={LOGO} alt="Logo" />
          {on == true && (
            <div className="flex items-center space-x-2 text-white ">
              <img
                className="w-10 h-10 cursor-pointer"
                src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"
                alt=""
                title={"User - " + user.displayName}
              />
              {/* <h1 className="text-lg font-bold">{user.displayName}</h1> */}
              <button onClick={handelSignOut} className="cursor-pointer">
                (Sign out)
              </button>
            </div>
          )}
        </div>
      )}
      <div className=" absolute z-20 w-full px-8 py-2 bg-gradient-to-b from-black flex justify-between top-">
        <img className="w-44" src={LOGO} alt="Logo" />
        {on == true && (
          <div className="flex items-center space-x-2 text-white ">
            <img
              className="w-10 h-10 cursor-pointer"
              src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"
              alt=""
              title={"User - " + user.displayName}
            />
            {/* <h1 className="text-lg font-bold">{user.displayName}</h1> */}
            <button onClick={handelSignOut} className="cursor-pointer">
              (Sign out)
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
