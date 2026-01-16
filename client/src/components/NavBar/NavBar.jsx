import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // Ensure framer-motion is installed

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about", isAnchor: true },
    { name: "Our Work", path: "/work", isAnchor: true },
    { name: "Awareness", path: "/awareness", isAnchor: true },
    { name: "Inspiration", path: "/inspiration", isAnchor: true },
  ];

  return (
    <nav 
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
        ? "bg-white/80 backdrop-blur-md shadow-sm py-3" 
        : "bg-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Animated Logo & Name Section */}
        <Link to="/" className="flex items-center group">
          <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full p-0.5 transition-transform duration-300 group-hover:scale-105 z-10 bg-white">
            <div className="absolute inset-0 bg-orange-400 opacity-20 blur-lg rounded-full group-hover:opacity-40 transition-opacity" />
            <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-slate-100 shadow-sm bg-white">
              <img 
                src="/icon.png" 
                alt="Logo" 
                className="h-full w-full object-cover" 
              />
            </div>
          </div>

          {/* sahAIta Text Reveal Animation */}
          <motion.div
            initial={{ width: 0, opacity: 0, x: -20 }}
            animate={{ width: "auto", opacity: 1, x: 10 }}
            transition={{ 
              duration: 1, 
              delay: 0.5, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100 
            }}
            className="overflow-hidden whitespace-nowrap flex items-center"
          >
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-black">
              Sah<span className="text-orange-500">AI</span>ta
            </span>
          </motion.div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-8 items-center">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                {link.isAnchor ? (
                  <a 
                    href={link.path} 
                    className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    to={link.path} 
                    className={`text-sm font-bold transition-colors ${
                      location.pathname === link.path ? "text-orange-600" : "text-slate-600 hover:text-orange-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </li>
            ))}
          </ul>

          <a 
            href="#contact" 
            className="bg-slate-900 text-white px-7 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-orange-600 transition-all duration-300 active:scale-95"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-slate-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;