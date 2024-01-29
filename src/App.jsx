import { Outlet } from "react-router-dom";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="md:container mx-auto">
        <Outlet />
      </div>
      <hr />
      <Footer />
    </>
  );
};
export default App;
