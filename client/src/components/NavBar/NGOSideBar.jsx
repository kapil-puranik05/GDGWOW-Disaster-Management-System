import React from 'react';
import { 
    Activity, Package, Users, ListChecks, LogOut, ShieldAlert 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function NGOSideBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: <Activity size={20} />, label: "Rescue Feed", path: "/ngo-main" },
        { icon: <Package size={20} />, label: "Inventory", path: "/inventory" },
        { icon: <Users size={20} />, label: "Team Tracking", path: "/team-tracking" },
        { icon: <ListChecks size={20} />, label: "SOP Manuals", path: "/sop-manuals" },
    ];

    return (
        <aside className="w-72 bg-white border-r border-orange-100 hidden lg:flex flex-col p-8 sticky top-0 h-screen z-40">
            {/* Branding */}
            <div className="flex items-center gap-2 mb-12">
                <div className="bg-orange-500 p-2 rounded-xl text-white shadow-lg shadow-orange-200">
                    <ShieldAlert size={24} />
                </div>
                <span className="font-black text-2xl tracking-tighter text-slate-800">
                    NGO<span className="text-orange-500">X</span>
                </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                            location.pathname === item.path
                                ? 'bg-orange-500 text-white shadow-xl shadow-orange-200'
                                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                    >
                        {item.icon} {item.label}
                    </button>
                ))}
            </nav>

            {/* Logout Section */}
            <div className="pt-8 border-t border-slate-100">
                <button 
                    onClick={() => navigate('/login')} 
                    className="flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-2xl w-full transition-all"
                >
                    <LogOut size={20} /> Sign Out
                </button>
            </div>
        </aside>
    );
}

export default NGOSideBar;