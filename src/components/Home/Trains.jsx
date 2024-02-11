import { useLoaderData } from "react-router-dom";
import Train from "./Train";

const Trains = () => {
  const trains = useLoaderData();

  return <Train trains={trains.results} />;
};
export default Trains;
