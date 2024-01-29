import { useLoaderData } from "react-router-dom";
import Banner from "../components/Home/Banner";
import Train from "../components/Home/Train";

const Home = () => {
  const trains = useLoaderData();

  return (
    <>
      <Banner />
      <Train trains={trains.results} />
    </>
  );
};
export default Home;
