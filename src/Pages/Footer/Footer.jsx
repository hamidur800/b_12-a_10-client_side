import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className=" mt-16">
      <div className="w-11/12 mx-auto py-10">
        <div className="footer sm:footer-horizontal text-base-content">
          {/* Brand Section */}
          <aside>
            <Link
              className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent drop-shadow-md"
              to="Home"
            >
              HOME-NEST
            </Link>
            <p className="mt-2 text-sm">akhane kisu likta hobe</p>
          </aside>

          {/* Services */}
          <nav>
            <h6 className="font-bold text-xl">Services</h6>
            <a className="link link-hover">Home</a>
            <a className="link link-hover">All Properties</a>
            <a className="link link-hover">Add Properties</a>
            <a className="link link-hover">My Properties</a>
            <a className="link link-hover">My Ratings</a>
          </nav>

          {/* Company */}
          <nav>
            <h6 className="font-bold text-xl">Company</h6>
            <a className="link link-hover">About Home Nest</a>
            <a className="link link-hover">Contact Us</a>
            <a className="link link-hover">Careers</a>
            <a className="link link-hover">Press & Media</a>
          </nav>

          {/* Legal */}
          <nav>
            <h6 className="font-bold text-xl">Legal</h6>
            <Link to="/terms" className="link link-hover">
              Terms of Use
            </Link>
            <Link to="/privacy" className="link link-hover">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="link link-hover">
              Cookie Policy
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Social Media */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center mt-8 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} HomeNest. All rights reserved.
          </p>
          <div className="flex gap-4 text-2xl text-gray-700">
            <Link
              to="https://www.facebook.com/hamidur.800"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook className="hover:text-blue-600 transition-colors" />
            </Link>
            <Link to="https://twitter.com" target="_blank" rel="noreferrer">
              <FaSquareXTwitter className="hover:text-sky-500 transition-colors" />
            </Link>
            <Link to="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-500 transition-colors" />
            </Link>
            <Link to="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube className="hover:text-red-600 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
