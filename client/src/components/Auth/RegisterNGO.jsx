import React, { useState, useEffect } from 'react';
import { 
    MapPin, Loader2, Building2, BarChart3, 
    Globe2, HeartHandshake, ChevronRight, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
    { icon: <Building2 size={32} />, title: "Join Our Mission", desc: "Partner with us for rural telemedicine." },
    { icon: <BarChart3 size={32} />, title: "Track Impact", desc: "Real-time data on healthcare reach." },
    { icon: <Globe2 size={32} />, title: "Wider Visibility", desc: "Digital health leader in rural India." }
];

function RegisterNGO() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', contact: '', latitude: '', longitude: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [locLoading, setLocLoading] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const validate = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = "Required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) tempErrors.email = "Invalid email";
        if (formData.password.length < 8) tempErrors.password = "Min 8 chars";
        if (!/^\d{10}$/.test(formData.contact)) tempErrors.contact = "10 digits required";
        if (!formData.latitude) tempErrors.location = "Capture coordinates";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const getLocation = () => {
        setLocLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setFormData(prev => ({ ...prev, latitude: pos.coords.latitude.toFixed(6), longitude: pos.coords.longitude.toFixed(6) }));
                    setLocLoading(false);
                },
                () => { setLocLoading(false); alert("Enable GPS access."); }
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            await new Promise(res => setTimeout(res, 1500));
            setIsSubmitted(true);
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[85vh] flex items-center justify-center p-6 bg-[#fffdf1]">
                <div className="max-w-md w-full bg-white rounded-[2rem] p-10 text-center shadow-xl">
                    <CheckCircle2 size={60} className="mx-auto text-green-500 mb-4" />
                    <h2 className="text-2xl font-black text-slate-800 mb-2">Success!</h2>
                    <p className="text-slate-500 mb-6">NGO application submitted for review.</p>
                    <Link to="/login" className="block w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all">Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-[#fffdf1] px-4 py-8">
            <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-orange-50">
                
                {/* --- Left Column: Compact Slider --- */}
                <div className="md:w-2/5 bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white flex flex-col justify-center text-center relative">
                    <div className="relative z-10 h-48 flex items-center justify-center">
                        {slides.map((s, i) => (
                            <div key={i} className={`absolute inset-0 transition-all duration-700 flex flex-col items-center justify-center ${currentSlide === i ? "opacity-100 scale-100" : "opacity-0 scale-95 translate-y-4"}`}>
                                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md mb-4">{s.icon}</div>
                                <h2 className="text-2xl font-black mb-2">{s.title}</h2>
                                <p className="text-orange-50 text-sm opacity-90 max-w-[200px]">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-1.5 mt-4">
                        {slides.map((_, i) => (
                            <div key={i} className={`h-1 rounded-full transition-all ${currentSlide === i ? "w-6 bg-white" : "w-1.5 bg-white/30"}`} />
                        ))}
                    </div>
                </div>

                {/* --- Right Column: Compact Form --- */}
                <div className="md:w-3/5 p-8 md:p-10 bg-white">
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-slate-800">NGO Registration</h2>
                        <p className="text-slate-500 text-sm">Fill in organization details.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input placeholder="NGO Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={`px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.name ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50/50 focus:border-orange-500'}`} />
                            <input placeholder="Email Address" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={`px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50/50 focus:border-orange-500'}`} />
                            <input placeholder="Password" type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className={`px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.password ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50/50 focus:border-orange-500'}`} />
                            <input placeholder="Phone Number" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className={`px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.contact ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50/50 focus:border-orange-500'}`} />
                        </div>

                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                <span>Coordinates</span>
                                {formData.latitude && <span className="text-green-500">Verified</span>}
                            </div>
                            <button type="button" onClick={getLocation} disabled={locLoading} className="w-full py-2.5 rounded-xl border-2 border-dashed border-orange-200 text-orange-600 text-xs font-bold hover:bg-orange-50 transition-all flex items-center justify-center gap-2">
                                {locLoading ? <Loader2 size={14} className="animate-spin"/> : <MapPin size={14}/>}
                                {formData.latitude ? `${formData.latitude}, ${formData.longitude}` : "Capture HQ Location"}
                            </button>
                        </div>

                        <button disabled={loading} className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-md shadow-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
                            {loading && <Loader2 size={18} className="animate-spin"/>} Finalize Registration
                        </button>
                    </form>

                    <p className="mt-6 text-center text-xs text-slate-400 font-semibold">
                        Already registered? <Link to="/login" className="text-orange-500 hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterNGO;