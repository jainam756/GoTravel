import React, { useContext, useState } from "react";
import { userContext } from "../Contexts/Usercontext";
import Navbar from "./Navbar";
import UserPlaces from "./userPlaces";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import UserBooking from "./UserBooking";

function Accountpage() {
  const { user, ready, setUser } = useContext(userContext);
  const [redirect, setRedirect] = useState(false);
  let { subpage } = useParams();

  async function handleLogout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect(true);
  }

  function applyStyle(type) {
    if (subpage === undefined && type === "profile") {
      subpage = "profile";
    }
    if (type === subpage) {
      return "px-6 py-3 text-white bg-primary rounded-full";
    } else {
      return "px-6 py-3 bg-gray-300 rounded-full";
    }
  }

  if (redirect) {
    return <Navigate replace to="/" />;
  }

  if (!ready) {
    return "loading";
  }

  if (ready && !user && !redirect) {
    return <Navigate replace to={"/login"} />;
  }

  return (
    <div>
      <Navbar />
      <nav className="w-full flex justify-center mt-4 gap-2">
        <Link className={applyStyle("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={applyStyle("user-booking")} to={"/account/user-booking"}>
          My Bookings
        </Link>
        <Link
          className={applyStyle("user-places")}
          to={"/account/user-places"}
        >
          My Accomodation
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="w-full justify-center text-center my-5 mx-auto">
          <div>Name:{user?.name}</div>
          <div>Email:{user?.email}</div>
          <button
            onClick={handleLogout}
            className="text-white my-4 py-2 px-4 justify-center rounded-full bg-primary"
          >
            log out
          </button>
        </div>
      )}
      {subpage === "user-places" && (
        <UserPlaces/>

      )}

      {subpage==="user-booking" &&(
        <UserBooking/>
      )}
    </div>
  );
}

export default Accountpage;
