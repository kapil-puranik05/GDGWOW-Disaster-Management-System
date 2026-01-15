import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Loader2, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError("Please enter your registered email.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API request to backend to send temporary password
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("Temporary password request sent for:", email);
            setIsSent(true);
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSent) {
        return (
            <div className="min-h-[85vh] flex items-center justify-center bg-[#fffdf1] px-4">
                <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-3">Check Your Email</h2>
                    <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                        A temporary password has been sent to <span className="text-slate-800 font-bold">{email}</span>. 
                        Please use it to log in and change your password immediately.
                    </p>
                    <Link to="/login" className="block w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-slate-200">
                        Return to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-[#fffdf1] px-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-orange-50">
                
                {/* Header */}
                <div className="mb-10">
                    <button 
                        onClick={() => navigate('/login')}
                        className="flex items-center gap-2 text-slate-400 hover:text-orange-500 font-bold text-sm mb-6 transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Back to Login
                    </button>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Forgot Password?</h1>
                    <p className="text-slate-500 mt-2 font-medium">Enter your email and we'll send you a temporary password.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-semibold animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleReset}>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">NGO Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all outline-none font-medium ${
                                    error ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50/50 focus:border-orange-500 focus:ring-4 focus:ring-orange-50'
                                }`}
                                placeholder="official@ngo.org"
                            />
                        </div>
                    </div>

                    <button 
                        disabled={isLoading}
                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Sending...
                            </>
                        ) : (
                            "Send Temporary Password"
                        )}
                    </button>
                </form>

                <div className="mt-10 text-center text-sm text-slate-400 font-medium">
                    Need help? <a href="mailto:support@krishix.com" className="text-orange-500 font-bold hover:underline">Contact Support</a>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;