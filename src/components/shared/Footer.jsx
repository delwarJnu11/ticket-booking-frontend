import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm">
              online ticket booking system is a software that allows potential
              customers to book and pay for a flight ticket directly through the
              website.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-sm">Mohammadpur, Dhaka-1207</p>
            <p className="text-sm">tickethub@gmail.com.bd</p>
            <p className="text-sm">+880 1521XXXXXX</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <p className="text-sm cursor-pointer hover:text-gray-400 transition-colors duration-300">
                <FaFacebook size={30} color="white" />
              </p>
              <p className="text-sm cursor-pointer hover:text-gray-400 transition-colors duration-300">
                <FaLinkedin size={30} color="white" />
              </p>
              <p className="text-sm cursor-pointer hover:text-gray-400 transition-colors duration-300">
                <FaYoutube size={30} color="white" />
              </p>
              <p className="text-sm cursor-pointer hover:text-gray-400 transition-colors duration-300">
                <FaTwitter size={30} color="white" />
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row md:items-center justify-between">
          <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-white mr-4">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
