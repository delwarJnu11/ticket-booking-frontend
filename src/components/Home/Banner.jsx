import banner from "../../assets/images/banner.png";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-1/2">
        <img className="w-full" src={banner} alt="Banner Image" />
      </div>

      <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0">
        <h2 className="text-3xl font-bold mb-2">Online Ticket Booking</h2>
        <p className="mb-4">
          online ticket booking system is a software that allows potential
          customers to book and pay for a flight ticket directly through the
          website. That means that all stages of booking from choosing a
          destination to paying for the reservation, are handled online that
          significantly reduces the staff workload and eliminates
          double-bookings.
        </p>
        <a
          href="#"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};
export default Banner;
