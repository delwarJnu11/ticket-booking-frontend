import { createBrowserRouter } from "react-router-dom";
import App from "../App";
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
    ],
  },
]);
