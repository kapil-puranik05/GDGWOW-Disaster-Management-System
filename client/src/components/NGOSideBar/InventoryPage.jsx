import React, { useState } from 'react';
import { 
    Package, Plus, Minus, Search, 
    ArrowLeft, X, Trash2, Save,
    AlertTriangle, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialInventory = [
    { id: 1, name: "Medical Kits", category: "Medical", stock: 85, unit: "Boxes", status: "In Stock" },
    { id: 2, name: "Drinking Water", category: "Essentials", stock: 12, unit: "Crates", status: "Low Stock" },
    { id: 3, name: "Rescue Boats", category: "Equipment", stock: 5, unit: "Units", status: "In Stock" },
];

function InventoryPage() {
    const navigate = useNavigate();
    const [inventory, setInventory] = useState(initialInventory);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', category: 'Essentials', stock: '', unit: '' });

    // Status Helper
    const getStatus = (stock) => {
        if (stock <= 0) return "Out of Stock";
        if (stock < 10) return "Critical";
        if (stock < 30) return "Low Stock";
        return "In Stock";
    };

    // --- DELETE RESOURCE LOGIC ---
    const deleteItem = (id) => {
        // Professional confirmation check
        if (window.confirm("Are you sure you want to remove this resource from the inventory?")) {
            setInventory(prev => prev.filter(item => item.id !== id));
        }
    };

    const updateStock = (id, amount) => {
        setInventory(inventory.map(item => {
            if (item.id === id) {
                const newStock = Math.max(0, item.stock + amount);
                return { ...item, stock: newStock, status: getStatus(newStock) };
            }
            return item;
        }));
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        const stockNum = parseInt(newItem.stock);
        const addedItem = {
            id: Date.now(),
            ...newItem,
            stock: stockNum,
            status: getStatus(stockNum)
        };
        setInventory([addedItem, ...inventory]);
        setShowAddModal(false);
        setNewItem({ name: '', category: 'Essentials', stock: '', unit: '' });
    };

    return (
        <div className="min-h-screen bg-[#fffdf1] p-6 md:p-10 font-sans relative">
            
            {/* Header Area */}
            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/ngo-main')} className="p-3 bg-white border border-orange-100 rounded-2xl hover:bg-orange-50 shadow-sm transition-all">
                        <ArrowLeft size={20} className="text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Resource Inventory</h1>
                        <p className="text-slate-500 font-medium italic">Manage, Update, or Clear NGO supplies.</p>
                    </div>
                </div>
                
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-orange-600 transition-all shadow-xl shadow-slate-200"
                >
                    <Plus size={20} /> Add New Resource
                </button>
            </header>

            {/* Inventory Card */}
            <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-orange-50 overflow-hidden">
                <div className="p-6 border-b border-slate-50">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name..." 
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-100 outline-none font-medium text-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
                            <tr>
                                <th className="px-8 py-5">Resource</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5 text-center">Stock</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {inventory.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                                <tr key={item.id} className="hover:bg-orange-50/30 transition-all group">
                                    <td className="px-8 py-6">
                                        <p className="font-black text-slate-800">{item.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400">{item.unit}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black">{item.category}</span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={`text-lg font-black block ${item.status === 'Critical' ? 'text-red-500' : 'text-slate-800'}`}>{item.stock}</span>
                                        <span className={`text-[9px] font-black uppercase ${item.status === 'Critical' ? 'text-red-500' : 'text-slate-400'}`}>{item.status}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-end gap-2 items-center">
                                            {/* Stock Adjustment */}
                                            <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                                                <button onClick={() => updateStock(item.id, -1)} className="p-1.5 hover:bg-white rounded-lg transition-all"><Minus size={14}/></button>
                                                <button onClick={() => updateStock(item.id, 1)} className="p-1.5 hover:bg-white rounded-lg transition-all"><Plus size={14}/></button>
                                            </div>
                                            
                                            {/* DELETE BUTTON */}
                                            <button 
                                                onClick={() => deleteItem(item.id)}
                                                className="p-2.5 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                title="Delete Resource"
                                            >
                                                <Trash2 size={18}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {inventory.length === 0 && (
                    <div className="p-20 text-center flex flex-col items-center">
                        <Package size={48} className="text-slate-200 mb-4" />
                        <p className="text-slate-400 font-bold italic">No resources in inventory. Add some above.</p>
                    </div>
                )}
            </div>

            {/* Modal remains the same as provided in previous step */}
            {/* ... AddItem Modal Code ... */}
        </div>
    );
}

export default InventoryPage;