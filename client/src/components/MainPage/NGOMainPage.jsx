import React, { useState } from 'react';
import { 
    AlertTriangle, Users, MapPin, Activity, 
    Bell, X, MailOpen, ChevronRight, Package, Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function NGOMainPage() {
    const navigate = useNavigate();
    
    // --- STATE MANAGEMENT ---
    const [notifications, setNotifications] = useState([
        { id: 1, sender: "Rahul Sharma", subject: "Medical Emergency", body: "Trapped in building collapse at Sector 4.", time: "2m ago", read: false },
        { id: 2, sender: "Local Police", subject: "Traffic Blockage", body: "Main bridge closed due to flooding.", time: "15m ago", read: false }
    ]);
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);
    const [selectedMail, setSelectedMail] = useState(null);

    const [resources] = useState([
        { name: "Med Kits", stock: 85, color: "bg-green-500" },
        { name: "Water Crates", stock: 40, color: "bg-blue-500" },
        { name: "Rescue Boats", stock: 12, color: "bg-orange-500" }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <main className="flex-grow p-6 md:p-10 overflow-y-auto h-screen custom-scrollbar">
            
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">NGO Command Center</h1>
                    <p className="text-slate-500 font-medium text-sm">Real-time Coordination & Resource Management</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div 
                            className="bg-white p-3.5 rounded-2xl border border-orange-100 shadow-sm cursor-pointer hover:bg-orange-50 transition-all relative"
                            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                        >
                            <Bell className={unreadCount > 0 ? "text-orange-500 animate-bounce" : "text-slate-400"} size={22}/>
                            {unreadCount > 0 && <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>}
                        </div>

                        {showNotifDropdown && (
                            <div className="absolute right-0 mt-4 w-80 bg-white rounded-[2rem] shadow-2xl border border-orange-50 overflow-hidden z-[60]">
                                <div className="p-5 border-b border-slate-50 bg-slate-50/50 font-black text-slate-800">Distress Alerts</div>
                                {notifications.map(notif => (
                                    <div key={notif.id} onClick={() => { setSelectedMail(notif); setShowNotifDropdown(false); }} className="p-4 border-b border-slate-50 cursor-pointer hover:bg-orange-50 transition-all">
                                        <div className="flex justify-between mb-1"><span className="font-bold text-sm text-slate-800">{notif.sender}</span></div>
                                        <p className="text-xs text-slate-500 line-clamp-1">{notif.subject}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* NGO RESOURCE TRACKER */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
                <div className="lg:col-span-3 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-black text-slate-800 flex items-center gap-2 italic uppercase tracking-tighter"><Package size={20} className="text-orange-500"/> Critical Supply Inventory</h3>
                        <button onClick={() => navigate('/inventory')} className="text-xs font-bold text-orange-600 hover:underline">Manage Inventory →</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {resources.map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase"><span>{item.name}</span><span>{item.stock}%</span></div>
                                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `${item.stock}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between">
                    <div>
                        <h4 className="font-bold text-orange-400 text-[10px] uppercase tracking-[0.2em] mb-4">Broadcast</h4>
                        <p className="text-sm opacity-80 font-medium leading-snug">Alert all active volunteers in your radius.</p>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all mt-6 shadow-lg shadow-orange-900/40">
                        <Send size={18} /> ALERT ALL
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-4">
                    <h3 className="font-black text-xl text-slate-800 mb-2 ml-2 tracking-tight">Active Distress Calls</h3>
                    <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-red-100 flex justify-between items-center group hover:bg-red-50/30 transition-all">
                       <div className="flex gap-4 items-center">
                            <div className="p-4 bg-red-100 text-red-600 rounded-2xl animate-pulse"><AlertTriangle size={24}/></div>
                            <div>
                                <span className="font-black text-slate-800 text-lg tracking-tight">Fire in Slum Area</span>
                                <p className="text-slate-500 text-sm font-medium">Bhavani Peth (0.8 km) • 2 mins ago</p>
                            </div>
                       </div>
                       <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center gap-2">Take Action <ChevronRight size={16}/></button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50">
                    <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2 tracking-tight"><Users size={20} className="text-blue-500"/> Team Status</h4>
                    <div className="space-y-4">
                        <TeamMember name="Dr. Amit K." status="Active" task="Medical" />
                        <TeamMember name="Suresh Patil" status="Available" task="Driver" />
                        <TeamMember name="John Doe" status="Offline" task="Rescue" />
                    </div>
                </div>
            </div>

            {selectedMail && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 animate-in zoom-in">
                        <div className="flex justify-between mb-8">
                            <div className="bg-red-100 p-3 rounded-2xl text-red-600"><MailOpen size={30}/></div>
                            <button onClick={() => setSelectedMail(null)} className="text-slate-300 hover:text-slate-800"><X size={24}/></button>
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">{selectedMail.subject}</h2>
                        <div className="bg-slate-50 p-6 rounded-3xl text-slate-600 font-medium leading-relaxed mb-8">{selectedMail.body}</div>
                        <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-orange-600 transition-all">Dispatch Help</button>
                    </div>
                </div>
            )}
        </main>
    );
}

function TeamMember({ name, status, task }) {
    return (
        <div className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0 last:pb-0">
            <div>
                <p className="text-sm font-black text-slate-800">{name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{task}</p>
            </div>
            <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${status === 'Active' ? 'bg-green-100 text-green-600' : status === 'Available' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                {status}
            </span>
        </div>
    );
}

export default NGOMainPage;
/*
useEffect(() => {
    const fetchDistressAlerts = async () => {
        const response = await fetch('YOUR_API_ENDPOINT/distress-emails');
        const data = await response.json();
        setNotifications(data);
    };
    // Poll for new alerts every 30 seconds
    const interval = setInterval(fetchDistressAlerts, 30000);
    return () => clearInterval(interval);
}, []);
*/ 