import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const loggedInUserId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    try {
      fetch(
        `https://ticket-booking-1eto.onrender.com/account/users/${loggedInUserId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("User not found");
          }
          return res.json();
        })
        .then((data) => {
          if (data) {
            setUser(data);
          } else {
            setUser(null);
            toast.error("User not found");
          }
        });
    } catch (error) {
      toast.error("Failed to fetch user data");
    }
  }, [loggedInUserId, token]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }
      const response = await fetch(
        "https://ticket-booking-1eto.onrender.com/account/logout"
      );
      // const response = await fetch("https://ticket-booking-1eto.onrender.com/account/logout/", {
      //   method: "GET",
      //   headers: {
      //     "content-type": "application/json",
      //     Authorization: `Token ${token}`,
      //   },
      // });

      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        toast.success("logout successful");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="navbar bg-gray-800">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="trains">Trains</NavLink>
            </li>
            <li>
              <NavLink to="bookings">Bookings</NavLink>
            </li>
            <li>
              <NavLink to="add_train">Add Train</NavLink>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Ticket Express</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="trains">Trains</NavLink>
          </li>
          <li>
            <NavLink to="bookings">Bookings</NavLink>
          </li>
          <li>
            <NavLink to="add_train">Add Train</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {!token ? (
          <div className="navbar-end">
            <NavLink to="register" className="btn">
              Register
            </NavLink>
            <NavLink to="login" className="btn ml-2">
              Login
            </NavLink>
          </div>
        ) : (
          <>
            <div className="hidden sm:flex justify-between items-center">
              <div className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user?.image} alt="User Avatar" />
                </div>
              </div>
              <div className="ml-4">
                Welcome, Mr. {user?.first_name} {user?.last_name}
              </div>
            </div>

            <button
              className="bg-red-500 px-4 py-2 ml-6"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
