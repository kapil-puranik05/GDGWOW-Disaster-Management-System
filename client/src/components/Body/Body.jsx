import React from 'react';
import { useNavigate } from 'react-router-dom';
import India from './BodyImg/India.jpeg';

function Body() {
    const navigate = useNavigate();

    return (
        /* Added pt-24 to ensure content starts below the fixed NavBar */
        <main className="relative min-h-screen flex items-center overflow-hidden bg-white pt-24 md:pt-32">
            {/* Background decorative element */}
            <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-orange-50/50 rounded-l-full blur-3xl" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 flex flex-col lg:flex-row items-center justify-between gap-12">
                
                {/* Left Content Section */}
                <div className="flex-1 flex flex-col gap-8 text-center lg:text-left">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
                            Empowering Every Citizen to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                                Be a Hero.
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
                            Join us in revolutionizing healthcare for underserved communities through telemedicine. 
                            We're putting the <span className="font-semibold text-orange-600 italic">'care'</span> back in healthcare for rural India, one pixel at a time!
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <button 
                            className="group relative bg-orange-500 px-8 py-4 text-white font-bold rounded-xl shadow-lg shadow-orange-200 transition-all duration-300 hover:bg-orange-600 hover:-translate-y-1 active:scale-95 cursor-pointer"
                            onClick={() => navigate('/register-ngo')}
                        >
                            Register Your NGO
                        </button>

                        <button 
                            className="px-8 py-4 text-orange-600 font-bold border-2 border-orange-500 rounded-xl transition-all duration-300 hover:bg-orange-50 active:scale-95 cursor-pointer"
                            onClick={() => navigate('/register-user')}
                        >
                            Register as Citizen
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 pt-4 justify-center lg:justify-start text-sm text-slate-500">
                        <div className="flex flex-col">
                            <span className="text-slate-900 font-bold text-lg">500+</span>
                            <span>NGOs Joined</span>
                        </div>
                        <div className="w-px h-10 bg-slate-200" />
                        <div className="flex flex-col">
                            <span className="text-slate-900 font-bold text-lg">10k+</span>
                            <span>Lives Impacted</span>
                        </div>
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="flex-1 relative group w-full max-w-xl">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-orange-200 to-transparent rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                    <img 
                        src={India} 
                        alt="India Map" 
                        className="relative w-full h-auto max-h-[500px] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" 
                    />
                </div>
            </div>
        </main>
    );
}

export default Body;