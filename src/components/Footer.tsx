import { useRef } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

import logoImage from "/images/money-tracker-by-piyush-dahle-logo-image.png";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <footer
      ref={footerRef}
      className="bg-[#051320] dark:bg-black text-white py-10 lg:px-25 relative overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-600/10 animate-pulse"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

          {/* Quick Links */}
          <div className="fade-up flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 flex gap-3 text-gray-300">
              <li>
                <Link to="/" className="hover:text-blue-400 hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-blue-400 hover:underline transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand */}
          <div className="fade-up flex flex-col items-center">
            <Link
              to="/"
              className="font-bold text-lg flex items-center justify-center md:justify-start gap-2"
            >
              <img
                src={logoImage}
                className="h-16 w-16 rounded-full border-2 border-blue-400 shadow-lg hover:scale-105 transition-transform duration-300"
                alt="Logo"
              />
              <h2 className="text-xl text-blue-400 font-bold">Money Tracker</h2>
            </Link>
            <p className="mt-3 text-sm text-gray-300 max-w-sm mx-auto text-center md:mx-0">
              Track your income, expenses, and goals with ease. Stay in control
              of your finances anytime, anywhere.
            </p>
          </div>

          {/* Social */}
          <div className="fade-up flex flex-col items-center md:items-end">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-5">
              <a href="#">
                <Facebook className="w-6 h-6 hover:text-blue-400 transition-transform transform hover:scale-110 duration-300" />
              </a>
              <a href="#">
                <Twitter className="w-6 h-6 hover:text-blue-400 transition-transform transform hover:scale-110 duration-300" />
              </a>
              <a href="#">
                <Instagram className="w-6 h-6 hover:text-blue-400 transition-transform transform hover:scale-110 duration-300" />
              </a>
              <a href="#">
                <Linkedin className="w-6 h-6 hover:text-blue-400 transition-transform transform hover:scale-110 duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm fade-up">
          © {new Date().getFullYear()}{" "}
          <span className="text-blue-400 font-semibold">Money Tracker</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
