import { format, parseISO } from "date-fns";

const Train = ({ trains }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-6 mb-6 text-center">
        Train List - Reserve Your Ticket
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700">Train Name</th>
              <th className="py-2 px-4 border-b border-gray-700">From</th>
              <th className="py-2 px-4 border-b border-gray-700">To</th>
              <th className="py-2 px-4 border-b border-gray-700">
                Available Seats
              </th>
              <th className="py-2 px-4 border-b border-gray-700">
                Date & Time
              </th>
              <th className="py-2 px-4 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {trains?.map((train) => (
              <tr key={train.id}>
                <td className="py-2 px-4">
                  {train.train_name}-{train.train_id}
                </td>
                <td className="py-2 px-4">{train.station}</td>
                <td className="py-2 px-4">{train.station}</td>
                <td className="py-2 px-4">{train.seats_available}</td>
                <td className="py-2 px-4">
                  {format(parseISO(train.schedule), "MMMM d, yyyy, h:mm:ss a")}
                </td>
                <td className="py-2 px-4">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    view available seats
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Train;
