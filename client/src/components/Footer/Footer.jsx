import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-[#252422] text-white px-10 py-10 w-full">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
                {/* About Us */}
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-orange-400 mb-4">About Us</h2>
                    <p className="text-sm text-gray-300">
                        Leveraging AI to outrun disaster and build resilient communities for a safer tomorrow.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-orange-400 mb-4">Quick Links</h2>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="/awareness" className="hover:text-orange-400">Awareness</a></li>
                        <li><a href="/contact" className="hover:text-orange-400">Contact</a></li>
                        <li><a href="/privacy" className="hover:text-orange-400">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-orange-400 mb-4">Connect With Us</h2>
                    <div className="flex gap-4 text-xl">
                        <a href="#" className="hover:text-orange-400"><FaFacebook /></a>
                        <a href="#" className="hover:text-orange-400"><FaInstagram /></a>
                        <a href="#" className="hover:text-orange-400"><FaLinkedin /></a>
                        <a href="#" className="hover:text-orange-400"><FaTwitter /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
             SahAIta - Rescuing People Digitally
            </div>
        </footer>
    );
}

export default Footer;
