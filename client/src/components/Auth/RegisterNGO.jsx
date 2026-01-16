import React, { useState, useEffect } from 'react';
import {
    MapPin,
    Loader2,
    Building2,
    BarChart3,
    Globe2,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
    { icon: <Building2 size={32} />, title: "Join Our Mission", desc: "Partner with us for rural telemedicine." },
    { icon: <BarChart3 size={32} />, title: "Track Impact", desc: "Real-time data on healthcare reach." },
    { icon: <Globe2 size={32} />, title: "Wider Visibility", desc: "Digital health leader in rural India." }
];

function RegisterNGO() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contact: '',
        latitude: '',
        longitude: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [locLoading, setLocLoading] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const validate = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = "Required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) tempErrors.email = "Invalid email";
        if (formData.password.length < 8) tempErrors.password = "Min 8 characters";
        if (!/^\d{10}$/.test(formData.contact)) tempErrors.contact = "10 digits required";
        if (!formData.latitude) tempErrors.location = "Capture coordinates";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const getLocation = () => {
        setLocLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setFormData(prev => ({
                    ...prev,
                    latitude: pos.coords.latitude.toFixed(6),
                    longitude: pos.coords.longitude.toFixed(6)
                }));
                setLocLoading(false);
            },
            () => {
                setLocLoading(false);
                alert("Enable GPS access.");
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setErrors({});

        try {
            const response = await fetch("http://localhost:8080/public/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    latitude: Number(formData.latitude),
                    longitude: Number(formData.longitude),
                    email: formData.email,
                    password: formData.password,
                    contactNumber: formData.contact
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Registration failed");
            }

            setIsSubmitted(true);
        } catch (err) {
            setErrors({ submit: err.message });
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[85vh] flex items-center justify-center p-6 bg-[#fffdf1]">
                <div className="max-w-md w-full bg-white rounded-[2rem] p-10 text-center shadow-xl">
                    <CheckCircle2 size={60} className="mx-auto text-green-500 mb-4" />
                    <h2 className="text-2xl font-black text-slate-800 mb-2">Success!</h2>
                    <p className="text-slate-500 mb-6">NGO application submitted successfully.</p>
                    <Link
                        to="/login"
                        className="block w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all"
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-[#fffdf1] px-4 py-8">
            <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-orange-50">

                {/* Left Slider */}
                <div className="md:w-2/5 bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white flex flex-col justify-center text-center">
                    <div className="relative z-10 min-h-[220px] flex items-center justify-center">
                        {slides.map((s, i) => (
                            <div
                                key={i}
                                className={`absolute inset-0 transition-all duration-700 flex flex-col items-center justify-center ${
                                    currentSlide === i ? "opacity-100 scale-100" : "opacity-0 scale-95 translate-y-4"
                                }`}
                            >
                                <div className="bg-white/20 p-3 rounded-2xl mb-4">{s.icon}</div>
                                <h2 className="text-2xl font-black mb-2">{s.title}</h2>
                                <p className="text-orange-50 text-sm max-w-[200px]">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <div className="md:w-3/5 p-8 md:p-10 bg-white">
                    <h2 className="text-2xl font-black text-slate-800 mb-1">NGO Registration</h2>
                    <p className="text-slate-500 text-sm mb-6">Fill in organization details.</p>

                    {errors.submit && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-bold flex items-center gap-2">
                            <AlertCircle size={14} />
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                ["NGO Name", "name"],
                                ["Email Address", "email"],
                                ["Password", "password"],
                                ["Phone Number", "contact"]
                            ].map(([label, key]) => (
                                <input
                                    key={key}
                                    type={key === "password" ? "password" : "text"}
                                    placeholder={label}
                                    value={formData[key]}
                                    onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                                    className="px-4 py-3 rounded-xl border text-sm outline-none transition-all
                                               border-slate-200 bg-slate-50/50 focus:border-orange-500
                                               focus:ring-4 focus:ring-orange-50"
                                />
                            ))}
                        </div>

                        {/* Location */}
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                <span>Coordinates</span>
                                {formData.latitude && <span className="text-green-500">Verified</span>}
                            </div>

                            <button
                                type="button"
                                onClick={getLocation}
                                disabled={locLoading}
                                className="w-full py-2.5 rounded-xl border-2 border-dashed border-orange-200
                                           text-orange-600 text-xs font-bold hover:bg-orange-50 transition-all
                                           flex items-center justify-center gap-2"
                            >
                                {locLoading ? <Loader2 size={14} className="animate-spin" /> : <MapPin size={14} />}
                                {formData.latitude
                                    ? `${formData.latitude}, ${formData.longitude}`
                                    : "Capture HQ Location"}
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-md
                                       shadow-lg shadow-slate-100 hover:bg-orange-600 hover:shadow-orange-200
                                       transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 size={18} className="animate-spin" />}
                            Finalize Registration
                        </button>
                    </form>

                    <p className="mt-6 text-center text-xs text-slate-400 font-semibold">
                        Already registered?{" "}
                        <Link to="/login" className="text-orange-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterNGO;
