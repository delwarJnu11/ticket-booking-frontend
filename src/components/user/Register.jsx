import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const INIT = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
  nid: "",
  image: null,
  address: "",
};

const Register = () => {
  const [userInfo, setUserInfo] = useState(INIT);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "image") {
      value = e.target.files[0];
    }
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all form fields to formData
    Object.keys(userInfo).forEach((key) => {
      formData.append(key, userInfo[key]);
    });

    try {
      const response = await fetch(
        "https://ticket-booking-1eto.onrender.com/account/registration/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data) {
          toast.success(data.message);
          navigate("/login");
          setUserInfo(INIT);
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
      <div className="shadow-2xl bg-transparent p-6 md:w-2/3 mx-auto">
        <h2 className="text-2xl text-center">Register Form</h2>
        <form
          onSubmit={handleSubmit}
          className="p-4"
          encType="multipart/form-data"
        >
          <div className="form-control">
            <label htmlFor="username" className="label">
              <span className="label-text text-white">User Name</span>
            </label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="User name"
              className="input input-primary w-full text-black"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label htmlFor="first_name" className="label">
                <span className="label-text text-white">First Name</span>
              </label>
              <input
                type="text"
                name="first_name"
                onChange={handleChange}
                placeholder="First name"
                className="input input-primary text-black"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="last_name" className="label">
                <span className="label-text text-white">Last Name</span>
              </label>
              <input
                type="text"
                name="last_name"
                onChange={handleChange}
                placeholder="Last name"
                className="input input-primary text-black"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                className="input input-primary text-black"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="phone" className="label">
                <span className="label-text text-white">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                placeholder="Phone"
                className="input input-primary text-black"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="input input-primary text-black"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="confirm_password" className="label">
                <span className="label-text text-white">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirm_password"
                onChange={handleChange}
                placeholder="Confirm password"
                className="input input-primary text-black"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label htmlFor="nid" className="label">
                <span className="label-text text-white">NID</span>
              </label>
              <input
                type="text"
                name="nid"
                onChange={handleChange}
                placeholder="NID"
                className="input input-primary text-black"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="image" className="label">
                <span className="label-text text-white">Image</span>
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="file-input file-input-primary w-full max-w-xs"
              />
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="address" className="label">
              <span className="label-text text-white">Address</span>
            </label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              placeholder="Address"
              className="input input-primary w-full text-black"
              required
            />
          </div>
          <div className="mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
