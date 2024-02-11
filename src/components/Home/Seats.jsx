import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbArmchair, TbArmchairOff } from "react-icons/tb";
import { useLoaderData, useNavigate } from "react-router-dom";

const Seats = () => {
  const train = useLoaderData();
  const navigate = useNavigate();
  const [seatno, setSeatNo] = useState(null);
  const [user, setUser] = useState(null);
  const [date, setDate] = useState("");
  const loggedInUserId = localStorage.getItem("user_id");
  const id = parseInt(loggedInUserId);

  useEffect(() => {
    fetch(`https://ticket-booking-1eto.onrender.com/account/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  const fullName = user?.first_name + " " + user?.last_name;

  const handleSeatClick = (seatno) => {
    setSeatNo(seatno);
  };

  const bookingData = {
    user: fullName,
    email: user?.email,
    phone: user?.phone,
    nid: user?.nid,
    train: train?.train_name,
    train_id: train?.train_id,
    start_station: train?.start_station,
    end_station: train?.end_station,
    fare: train?.price,
    departure_time: train?.departure_time,
    seat_number: seatno,
    journey_date: date,
  };

  console.log(bookingData);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://ticket-booking-1eto.onrender.com/bookings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create booking");
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          const updatedSeats = train?.all_seats.map((seat) => {
            if (seat.seat_no === data.seat_number) {
              return { ...seat, is_booked: true };
            }
            return seat;
          });
          fetch(
            `https://ticket-booking-1eto.onrender.com/trains/${train.id}/`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...train, all_seats: [...updatedSeats] }),
            }
          )
            .then((res) => {
              if (!res.ok) {
                throw new Error("Failed to update seats");
              }
              return res.json();
            })
            .then((data) => {
              if (data) {
                toast.success("Your booking was successful");
              }
            })
            .catch((error) => {
              toast.error(error.message);
            });
          navigate("/bookings");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <h2 className="text-center text-2xl my-6">
        Select your Seat and Booked Ticket
      </h2>
      <div className="flex justify-center flex-col md:flex-row gap-4">
        <div className="flex justify-center items-center mx-auto w-full md:w-1/2 p-6">
          <div className="bg-white p-8 rounded-lg shadow-md w-3/4">
            <div className="flex justify-center flex-wrap gap-2 -m-4">
              {train?.all_seats?.map((seat) => {
                const isBooked = seat.is_booked === true;

                return (
                  <div
                    key={seat.id}
                    className={`${
                      isBooked ? "bg-red-400" : "bg-green-400"
                    } p-4 m-2 rounded-md flex items-center justify-center tooltip`}
                    aria-disabled={isBooked}
                    data-tip={seat.seat_no}
                  >
                    {isBooked ? (
                      <TbArmchairOff size={30} />
                    ) : (
                      <TbArmchair
                        onClick={() => handleSeatClick(seat.seat_no)}
                        size={30}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <form
          className="p-6 bg-gray-800 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/2 xl:w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="form-control">
            <label htmlFor="user" className="label">
              <span className="label-text text-white">Passenger Name</span>
            </label>
            <input
              type="text"
              name="user"
              value={fullName}
              readOnly
              className="input input-primary w-full text-black"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="from" className="label">
              <span className="label-text text-white">From</span>
            </label>
            <input
              type="text"
              name="From"
              value={train?.start_station}
              className="input input-primary w-full text-black"
              required
              readOnly
            />
          </div>
          <div className="form-control">
            <label htmlFor="to" className="label">
              <span className="label-text text-white">To</span>
            </label>
            <input
              type="text"
              name="to"
              value={train?.end_station}
              className="input input-primary w-full text-black"
              required
              readOnly
            />
          </div>
          <div className="form-control">
            <label htmlFor="train" className="label">
              <span className="label-text text-white">Train Name</span>
            </label>
            <input
              type="text"
              name="train"
              value={train?.train_name}
              className="input input-primary w-full text-black"
              required
              readOnly
            />
          </div>
          <div className="form-control">
            <label htmlFor="fare" className="label">
              <span className="label-text text-white">Fare</span>
            </label>
            <input
              type="number"
              name="fare"
              value={train?.price}
              className="input input-primary w-full text-black"
              required
              readOnly
            />
          </div>
          <div className="form-control">
            <label htmlFor="seatno" className="label">
              <span className="label-text text-white">Seat No.</span>
            </label>
            <input
              type="text"
              name="seatno"
              defaultValue={seatno}
              className="input input-primary w-full text-black"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="journey_date" className="label">
              <span className="label-text text-white">Select Journey Date</span>
            </label>
            <input
              type="date"
              name="journey_date"
              defaultValue={date}
              className="input input-primary w-full text-black"
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
            <button className="btn btn-primary">Booking Ticket</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Seats;
