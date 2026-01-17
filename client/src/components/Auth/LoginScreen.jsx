import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, Loader2, Lock, Mail, ChevronRight } from 'lucide-react';

function LoginScreen() {
    const navigate = useNavigate();
    
    // State management
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Validation logic
    const validate = () => {
        let tempErrors = {};
        if (!formData.email) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email address is invalid";
        }
        if (!formData.password) {
            tempErrors.password = "Password is required";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    try {
        const response = await fetch("http://localhost:8080/public/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await response.json();

        // 1️⃣ Store token
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("ngoId", data.ngoId)
        // 2️⃣ Navigate
        navigate("/ngo-main");

    } catch (error) {
        setErrors({ auth: error.message || "Login failed" });
    } finally {
        setIsLoading(false);
    }
};


    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-[#fffdf1] px-4 py-8">
            {/* Main Card: Consistent with Register/Forgot Password pages */}
            <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-8 md:p-10 border border-orange-50 transition-all">
                
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl mb-4">
                        <Lock size={28} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">NGO Portal</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Welcome back, Partner.</p>
                </div>

                {/* Authentication Error Alert */}
                {errors.auth && (
                    <div className="mb-6 p-3.5 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-xs font-bold animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={16} />
                        {errors.auth}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleLogin}>
                    {/* Email Input Field */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">NGO Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all outline-none font-medium ${
                                    errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50/50 focus:border-orange-500 focus:ring-4 focus:ring-orange-50'
                                }`}
                                placeholder="admin@ngo.org"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-[10px] font-bold ml-1 uppercase tracking-wider">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Input Field */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                                type="password" 
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all outline-none font-medium ${
                                    errors.password ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50/50 focus:border-orange-500 focus:ring-4 focus:ring-orange-50'
                                }`}
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-[10px] font-bold ml-1 uppercase tracking-wider">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Options & Forgot Password */}
                    <div className="flex items-center justify-between px-1 pt-1">
                        <label className="flex items-center gap-2 text-xs text-slate-500 font-medium cursor-pointer group">
                            <input 
                                type="checkbox" 
                                className="w-3.5 h-3.5 rounded border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer" 
                            />
                            <span className="group-hover:text-slate-800 transition-colors">Remember device</span>
                        </label>
                        <Link 
                            to="/forgot-password" 
                            className="text-xs text-orange-600 font-bold hover:underline underline-offset-4 transition-all"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button 
                        disabled={isLoading}
                        className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-md shadow-lg shadow-slate-100 hover:bg-orange-600 hover:shadow-orange-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Verifying Partner...
                            </>
                        ) : (
                            "Sign In to Portal"
                        )}
                    </button>
                </form>

                {/* Footer Redirection */}
                <div className="text-center mt-8 pt-6 border-t border-slate-100">
                    <p className="text-slate-400 font-bold text-xs">
                        New organization?{' '}
                        <Link to="/register-ngo" className="text-orange-600 hover:underline inline-flex items-center gap-0.5">
                            Register NGO <ChevronRight size={12} />
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;