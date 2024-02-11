import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import notFound from "../../assets/images/notFound.png";
import BookingInfo from "./BookingInfo";

const Bookings = () => {
  const [user, setUser] = useState(null);
  const bookings = useLoaderData();
  const loggedInUserId = localStorage.getItem("user_id");
  const id = parseInt(loggedInUserId);

  useEffect(() => {
    fetch(`https://ticket-booking-1eto.onrender.com/account/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  if (!Array.isArray(bookings) || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <img
          src={notFound}
          alt="not found"
          className="max-w-xs md:max-w-sm lg:max-w-md mb-4"
        />
        <p className="text-lg text-gray-700 mb-4">
          No Bookings Available for you.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }
  return (
    <>
      <h2 className="text-2xl font-semibold mt-6 mb-6 text-center">
        booking List - Reserve Your Ticket
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700">Train Name</th>
              <th className="py-2 px-4 border-b border-gray-700">
                Passenger Name
              </th>
              <th className="py-2 px-4 border-b border-gray-700">
                Seat Number
              </th>
              <th className="py-2 px-4 border-b border-gray-700">Fare</th>
              <th className="py-2 px-4 border-b border-gray-700">
                Booking Date
              </th>
              <th className="py-2 px-4 border-b border-gray-700">
                Journey Date
              </th>
              <th className="py-2 px-4 border-b border-gray-700">
                Departure Time
              </th>
              <th className="py-2 px-4 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {bookings &&
              bookings
                ?.filter((booking) => booking?.email === user?.email)
                ?.map((booking) => (
                  <BookingInfo key={booking.id} booking={booking} />
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Bookings;
