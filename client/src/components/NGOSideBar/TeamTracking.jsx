import React, { useState, useEffect } from 'react';
import {
    Users, Plus, Search, Trash2, MapPin, Phone,
    X, CheckCircle2, UserPlus, Activity, Smartphone
} from 'lucide-react';

/* =========================
   NORMALIZATION LAYER
========================= */
const STATUS_MAP = {
    AVAILABLE: "Available",
    ACTIVE: "Active",
    ON_MISSION: "On Mission"
};

const normalizeVolunteer = (v) => ({
    id: v.id,
    name: v.name,
    role: v.expertise,
    contact: v.contactNumber,
    zone: v.zone,
    status: STATUS_MAP[v.status] ?? "Available"
});

function TeamTracking() {
    const [volunteers, setVolunteers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const [newVol, setNewVol] = useState({
        name: '',
        role: 'General Rescue',
        contact: '',
        zone: ''
    });

    /* =========================
       FETCH VOLUNTEERS
    ========================= */
    useEffect(() => {
        const fetchVolunteers = async () => {
            const ngoId = sessionStorage.getItem("ngoId");
            const token = sessionStorage.getItem("authToken");
            if (!ngoId || !token) return;

            try {
                const res = await fetch(
                    `http://localhost:8080/volunteers/${ngoId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!res.ok) throw new Error("Failed to fetch volunteers");

                const data = await res.json();
                setVolunteers(data.map(normalizeVolunteer));

            } catch (err) {
                console.error("Fetch volunteers failed:", err);
            }
        };

        fetchVolunteers();
    }, []);

    /* =========================
       ADD VOLUNTEER
    ========================= */
    const addVolunteer = async (e) => {
        e.preventDefault();

        const ngoId = sessionStorage.getItem("ngoId");
        const token = sessionStorage.getItem("authToken");
        if (!ngoId || !token) return;

        const payload = {
            name: newVol.name,
            expertise: newVol.role,
            contactNumber: newVol.contact,
            zone: newVol.zone
        };

        try {
            const res = await fetch(
                `http://localhost:8080/volunteers/${ngoId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                }
            );

            if (!res.ok) throw new Error("Failed to add volunteer");

            const saved = await res.json();

            setVolunteers(prev => [
                normalizeVolunteer(saved),
                ...prev
            ]);

            setShowAddModal(false);
            setNewVol({ name: '', role: 'General Rescue', contact: '', zone: '' });

        } catch (err) {
            console.error("Add volunteer failed:", err);
        }
    };

    /* =========================
       UI LOGIC (UNCHANGED)
    ========================= */
    const deleteVolunteer = async (id) => {
    if (!window.confirm("Remove this volunteer from the active roster?")) return;
    const ngoId = sessionStorage.getItem("ngoId");
    const token = sessionStorage.getItem("authToken");
    if (!ngoId || !token) {
        alert("Not authenticated");
        return;
    }
    try {
        const res = await fetch(
            `http://localhost:8080/volunteers/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        if (!res.ok) {
            throw new Error("Failed to delete volunteer");
        }
        // ✅ Update UI only after backend success
        setVolunteers(prev => prev.filter(v => v.id !== id));
    } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete volunteer");
    }
};

    const toggleStatus = (id) => {
        const statusMap = {
            "Available": "Active",
            "Active": "On Mission",
            "On Mission": "Available"
        };

        setVolunteers(volunteers.map(v =>
            v.id === id
                ? { ...v, status: statusMap[v.status] }
                : v
        ));
    };

    /* =========================
       IDEAL UI (UNCHANGED)
    ========================= */
    return (
        <main className="flex-grow p-6 md:p-10 bg-[#fffdf1] overflow-y-auto h-screen">

            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Team Tracking</h1>
                    <p className="text-slate-500 font-medium">Coordinate your disaster response force.</p>
                </div>

                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-black hover:bg-orange-600 transition-all shadow-xl shadow-slate-200"
                >
                    <UserPlus size={20} /> Add Volunteer
                </button>
            </header>

            {/* Team Table */}
            <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-orange-50 overflow-hidden">
                <div className="p-6 border-b border-slate-50">
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search name, role, or number..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 outline-none font-medium text-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <tr>
                                <th className="px-8 py-5">Volunteer Info</th>
                                <th className="px-8 py-5">Expertise</th>
                                <th className="px-8 py-5 text-center">Status</th>
                                <th className="px-8 py-5 text-right">Contact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {volunteers
                                .filter(v =>
                                    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    v.contact.includes(searchTerm)
                                )
                                .map((v) => (
                                    <tr key={v.id} className="hover:bg-orange-50/20 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-black text-sm">
                                                    {v.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800">{v.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{v.zone}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase">
                                                {v.role}
                                            </span>
                                        </td>

                                        <td className="px-8 py-6 text-center">
                                            <button
                                                onClick={() => toggleStatus(v.id)}
                                                className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                                                    v.status === 'Active'
                                                        ? 'bg-green-100 text-green-600'
                                                        : v.status === 'On Mission'
                                                        ? 'bg-orange-100 text-orange-600 animate-pulse'
                                                        : 'bg-slate-100 text-slate-400'
                                                }`}
                                            >
                                                {v.status}
                                            </button>
                                        </td>

                                        <td className="px-8 py-6">
                                            <div className="flex justify-end gap-3 items-center">
                                                <div className="text-right">
                                                    <p className="text-xs font-black text-slate-800">+{v.contact}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Mobile Verified</p>
                                                </div>
                                                <a href={`tel:${v.contact}`} className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-slate-200">
                                                    <Phone size={14} />
                                                </a>
                                                <button
                                                    onClick={() => deleteVolunteer(v.id)}
                                                    className="p-2 text-slate-300 hover:text-red-500 transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- ENROLL VOLUNTEER MODAL --- */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                            <h2 className="text-xl font-black text-slate-800">Enroll Volunteer</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-800">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={addVolunteer} className="p-8 space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full mt-1.5 px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-medium"
                                    value={newVol.name}
                                    onChange={(e) => setNewVol({ ...newVol, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                                <div className="relative">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        required
                                        type="tel"
                                        className="w-full mt-1.5 pl-12 pr-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-medium"
                                        value={newVol.contact}
                                        onChange={(e) => setNewVol({ ...newVol, contact: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Expertise</label>
                                    <select
                                        className="w-full mt-1.5 px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-medium"
                                        value={newVol.role}
                                        onChange={(e) => setNewVol({ ...newVol, role: e.target.value })}
                                    >
                                        <option value="General Rescue">General Rescue</option>
                                        <option value="Medical Support">Medical Support</option>
                                        <option value="Rescue Diver">Diver</option>
                                        <option value="Logistics">Logistics</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Zone</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full mt-1.5 px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-medium"
                                        value={newVol.zone}
                                        onChange={(e) => setNewVol({ ...newVol, zone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-orange-600 transition-all mt-4 flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
                            >
                                <CheckCircle2 size={20} /> Onboard Volunteer
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

export default TeamTracking;
