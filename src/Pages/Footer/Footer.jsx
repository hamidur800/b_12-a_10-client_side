import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="text-base-content transition-colors duration-500">
      <div className="w-11/12 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-base-300 pb-8">
          <div className="text-center md:text-left">
            <Link
              className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent drop-shadow-md"
              to="Home"
            >
              HOME-NEST
            </Link>
            <p className="mt-2 text-sm opacity-80">
              Building reliable digital solutions with creativity and
              innovation.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {["Home", "About", "Services", "Portfolio", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-primary transition"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
        <div className="text-center mt-6 text-xs opacity-60">
          © 2025 HOME-NEST — All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
