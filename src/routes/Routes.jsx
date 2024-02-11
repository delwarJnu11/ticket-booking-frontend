import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Bookings from "../components/Bookings/Bookings";
import Seats from "../components/Home/Seats";
import Trains from "../components/Home/Trains";
import Login from "../components/user/Login";
import Register from "../components/user/Register";
import AddTrain from "../pages/AddTrain";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("https://ticket-booking-1eto.onrender.com/trains/"),
      },
      {
        path: "/trains",
        element: <Trains />,
        loader: () => fetch("https://ticket-booking-1eto.onrender.com/trains/"),
      },
      {
        path: "/view_available_seats/:id",
        element: <Seats />,
        loader: ({ params }) =>
          fetch(`https://ticket-booking-1eto.onrender.com/trains/${params.id}`),
      },
      {
        path: "/bookings",
        element: <Bookings />,
        loader: () =>
          fetch(`https://ticket-booking-1eto.onrender.com/bookings/`),
      },
      {
        path: "/add_train",
        element: <AddTrain />,
        loader: () => fetch(`https://ticket-booking-1eto.onrender.com/seats/`),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
