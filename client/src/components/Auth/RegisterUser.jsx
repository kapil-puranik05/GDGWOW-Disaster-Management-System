import React from 'react';

function RegisterUser() {
    return (
        <div className="min-h-screen bg-[#fffdf1] flex items-center justify-center py-12 px-4">
            <div className="max-w-sm w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-orange-50">
                <div className="inline-block p-4  rounded-2xl mb-6">
                    {/* Placeholder for QR Code - You can use a library like qrcode.react */}
                    <div className="w-48 h-48 bg-white border-4 border-white shadow-inner flex items-center justify-center overflow-hidden rounded-lg">
                        <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=YOUR_APP_DOWNLOAD_LINK" 
                            alt="Scan to download" 
                            className="w-full h-full"
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-black text-slate-800 mb-3">Download Our App</h2>
                <p className="text-slate-500 leading-relaxed mb-8">
                    Scan this QR code to download the mobile app. You can register as a citizen and get instant healthcare help from there.
                </p>

                <div className="flex flex-col gap-3">
                    <div className="h-px bg-slate-100 w-full mb-2" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available on</p>
                    <div className="flex justify-center gap-4 text-slate-700 font-bold">
                        <span>Android</span>
                        <span className="text-slate-200">|</span>
                        <span>iOS</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterUser;