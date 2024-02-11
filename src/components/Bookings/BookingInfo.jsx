import { format, parseISO } from "date-fns";
import img from "../../assets/images/download.svg";
import { generatePDF } from "../../utils/pdfGenrator";

const BookingInfo = ({ booking }) => {
  const ticket = {
    passengerName: booking.user,
    email: booking.email,
    Phone: booking.phone,
    nid: booking.nid,
    trainName: booking.train_name,
    trainCode: booking.train_id,
    from: booking.start_station,
    to: booking.end_station,
    fare: booking.fare,
    bookingDate: format(
      parseISO(booking.booking_date),
      "MMMM d, yyyy, h:mm:ss a"
    ),
    journeyDate: format(parseISO(booking.journey_date), "MMMM d, yyyy"),
    departureTime: booking.departure_time,
  };
  return (
    <tr>
      <td className="py-2 px-4">{booking.train}</td>
      <td className="py-2 px-4">{booking.user}</td>
      <td className="py-2 px-4">{booking.seat_number}</td>
      <td className="py-2 px-4">{booking.fare}</td>
      <td className="py-2 px-4">
        {format(parseISO(booking.booking_date), "MMMM d, yyyy, h:mm:ss a")}
      </td>
      <td className="py-2 px-4">
        {format(parseISO(booking.journey_date), "MMMM d, yyyy")}
      </td>
      <td className="py-2 px-4">{booking.departure_time}</td>
      <td className="py-2 px-4">
        <button
          onClick={() => generatePDF(ticket)}
          className="tooltip"
          data-tip="download"
        >
          <img className="w-6" src={img} alt="" />
        </button>
      </td>
    </tr>
  );
};
export default BookingInfo;
