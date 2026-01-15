import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Effect to handle scroll styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "#about", isAnchor: true },
    { name: "Our Work", path: "#work", isAnchor: true },
    { name: "Awareness", path: "/awareness" },
    { name: "Inspiration", path: "#inspiration", isAnchor: true },
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
        
        {/* Logo with subtle glow effect */}
        <Link to="/" className="flex items-center group">
          <div className="relative h-14 w-14 rounded-full p-0.5 transition-transform duration-300 group-hover:scale-110">
            <div className="absolute inset-0 bg-orange-400 opacity-20 blur-lg rounded-full group-hover:opacity-40 transition-opacity" />
            <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-full w-full object-cover" 
              />
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-8 items-center">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                {link.isAnchor ? (
                  <a 
                    href={link.path} 
                    className="text-sm font-semibold text-slate-600 hover:text-orange-500 transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    to={link.path} 
                    className={`text-sm font-semibold transition-colors ${
                      location.pathname === link.path ? "text-orange-600" : "text-slate-600 hover:text-orange-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
                {/* Animated Underline Effect */}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </li>
            ))}
          </ul>

          {/* Contact Button with subtle gradient */}
          <a 
            href="#contact" 
            className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-200 hover:from-orange-500 hover:to-orange-600 hover:shadow-orange-200 transition-all duration-300 active:scale-95"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu (Optional Icon) */}
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