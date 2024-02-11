import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddTrain = () => {
  const [train, setTrain] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTrain({
      ...train,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(train);
    try {
      const response = await fetch(
        "https://ticket-booking-1eto.onrender.com/trains/",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(train),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          navigate("/");
          toast.success(data.message);
        }
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <div className="shadow-2xl bg-gray-800 p-6 md:w-2/3 mx-auto mt-4 rounded">
        <h2 className="text-2xl text-center">Add A Train</h2>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="form-control">
            <label htmlFor="train_name" className="label">
              <span className="label-text text-white">Train Name</span>
            </label>
            <input
              type="text"
              id="train_name"
              onChange={handleChange}
              name="train_name"
              placeholder="Enter train name"
              className="input input-primary w-full text-black"
              required
            />
          </div>

          {/* Train ID */}
          <div className="form-control">
            <label htmlFor="train_id" className="label">
              <span className="label-text text-white">Train ID</span>
            </label>
            <input
              type="text"
              id="train_id"
              onChange={handleChange}
              name="train_id"
              placeholder="Enter train ID"
              className="input input-primary w-full text-black"
              required
            />
          </div>

          {/* Seats Available */}
          <div className="form-control">
            <label htmlFor="seats_available" className="label">
              <span className="label-text text-white">Seats Available</span>
            </label>
            <input
              type="number"
              id="seats_available"
              name="seats_available"
              placeholder="Enter seats available"
              className="input input-primary w-full text-black"
              required
            />
          </div>

          {/* Departure Time */}
          <div className="form-control">
            <label htmlFor="departure_time" className="label">
              <span className="label-text text-white">Departure Time</span>
            </label>
            <select
              id="departure_time"
              onChange={handleChange}
              name="departure_time"
              className="input input-primary w-full text-black"
              required
            >
              <option value="">Select departure time</option>
              <option value="8.00AM">8.00AM</option>
              <option value="9.00AM">9.00AM</option>
              <option value="10.00AM">10.00AM</option>
              <option value="11.00AM">11.00AM</option>
              <option value="12.00PM">12.00PM</option>
              <option value="1.00PM">1.00PM</option>
              <option value="2.00PM">2.00AM</option>
              <option value="4.00PM">4.00PM</option>
              <option value="6.00PM">6.00PM</option>
              <option value="8.00PM">8.00PM</option>
              <option value="9.00PM">9.00PM</option>
              <option value="10.00PM">10.00PM</option>
              <option value="11.00PM">11.00PM</option>
            </select>
          </div>

          {/* Start Station */}
          <div className="form-control">
            <label htmlFor="start_station" className="label">
              <span className="label-text text-white">Start Station</span>
            </label>
            <input
              type="text"
              id="start_station"
              onChange={handleChange}
              name="start_station"
              placeholder="Enter start station"
              className="input input-primary w-full text-black"
              required
            />
          </div>

          {/* End Station */}
          <div className="form-control">
            <label htmlFor="end_station" className="label">
              <span className="label-text text-white">End Station</span>
            </label>
            <input
              type="text"
              id="end_station"
              onChange={handleChange}
              name="end_station"
              placeholder="Enter end station"
              className="input input-primary w-full text-black"
              required
            />
          </div>

          {/* Price */}
          <div className="form-control">
            <label htmlFor="price" className="label">
              <span className="label-text text-white">Price</span>
            </label>
            <input
              type="number"
              id="price"
              onChange={handleChange}
              name="price"
              placeholder="Enter price"
              className="input input-primary w-full text-black"
              required
            />
          </div>
          <div className="mt-6">
            <button className="btn btn-primary">Add Train</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddTrain;
