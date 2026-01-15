import React, { useState } from 'react';
import { 
    X, ChevronRight, HeartPulse, Flame, Droplets, 
    Volume2, VolumeX, Languages, Play, Package, 
    ShieldAlert, Search, Wind, Zap, Skull
} from 'lucide-react';

const sopLibrary = [
    {
        id: "SOP-01",
        category: "Medical",
        icon: <HeartPulse className="text-red-500" />,
        translations: {
            "en-US": {
                title: "Medical First Response",
                steps: ["Assess airway", "Check for pulse", "Control major bleeding", "Call for transport"],
                equipment: ["Gloves", "Gauze", "Tourniquet"]
            },
            "mr-IN": {
                title: "वैद्यकीय प्रथमोपचार",
                steps: ["श्वसनमार्गाची तपासणी करा", "नाडी तपासा", "रक्तस्त्राव थांबवा", "वाहनाला पाचारण करा"],
                equipment: ["हातमोजे", "पट्टी", "टूर्निकेट"]
            },
            "hi-IN": {
                title: "चिकित्सा प्राथमिक प्रतिक्रिया",
                steps: ["वायुमार्ग की जांच करें", "नाड़ी की जाँच करें", "रक्तस्राव को नियंत्रित करें", "परिवहन के लिए कॉल करें"],
                equipment: ["दस्ताने", "पट्टी", "टूर्निकेट"]
            },
            "ta-IN": {
                title: "மருத்துவ முதலுதவி",
                steps: ["சுவாசப் பாதையைச் சோதிக்கவும்", "நாடித் துடிப்பைச் சரிபார்க்கவும்", "இரத்தப்போக்கைக் கட்டுப்படுத்தவும்", "ஆம்புலன்ஸை அழைக்கவும்"],
                equipment: ["கையுறைகள்", "கட்டு", "டூர்னிக்கெட்"]
            }
        }
    },
    {
        id: "SOP-02",
        category: "Fire",
        icon: <Flame className="text-orange-500" />,
        translations: {
            "en-US": {
                title: "Fire Evacuation",
                steps: ["Stay low to avoid smoke", "Check doors for heat", "Use stairs, not elevators", "Proceed to assembly point"],
                equipment: ["Smoke Mask", "Flashlight", "Fire Blanket"]
            },
            "mr-IN": {
                title: "आग विझवणे आणि बाहेर पडणे",
                steps: ["धूर टाळण्यासाठी खाली वाका", "दरवाजा गरम आहे का ते तपासा", "लिफ्ट वापरू नका, पायऱ्या वापरा", "सुरक्षित ठिकाणी एकत्र या"],
                equipment: ["मास्क", "बॅटरी", "अग्निशमन ब्लँकेट"]
            },
            "hi-IN": {
                title: "अग्नि निकासी",
                steps: ["धुएं से बचने के लिए नीचे झुकें", "दरवाजों की गर्मी जांचें", "लिफ्ट का नहीं, सीढ़ियों का उपयोग करें", "सभा स्थल पर जाएं"],
                equipment: ["धुआं मास्क", "फ्लैशलाइट", "अग्नि कंबल"]
            },
            "ta-IN": {
                title: "தீ வெளியேற்றம்",
                steps: ["புகையைத் தவிர்க்க கீழே குனியவும்", "கதவுகளின் வெப்பத்தைச் சரிபார்க்கவும்", "மின் தூக்கியைத் தவிர்க்கவும்", "பாதுகாப்பான இடத்திற்குச் செல்லவும்"],
                equipment: ["புகை முகமூடி", "மின்விளக்கு", "தீ போர்வை"]
            }
        }
    },
    {
        id: "SOP-03",
        category: "Earthquake",
        icon: <Zap className="text-yellow-500" />,
        translations: {
            "en-US": {
                title: "Earthquake Safety",
                steps: ["Drop, Cover, and Hold on", "Stay away from windows", "Do not run outside", "Protect your head"],
                equipment: ["Hard Hat", "Whistle", "First Aid Kit"]
            },
            "mr-IN": {
                title: "भूकंप सुरक्षा",
                steps: ["खाली वाका, स्वतःला झाकून घ्या आणि धरून ठेवा", "खिडक्यांपासून लांब राहा", "बाहेर धावू नका", "आपल्या डोक्याचे संरक्षण करा"],
                equipment: ["टोपी", "शिट्टी", "प्रथमोपचार संच"]
            },
            "hi-IN": {
                title: "भूकंप सुरक्षा",
                steps: ["झुकें, ढंकें और पकड़ें", "खिड़कियों से दूर रहें", "बाहर न भागें", "अपने सिर की रक्षा करें"],
                equipment: ["हेलमेट", "सीटी", "प्राथमिक चिकित्सा किट"]
            },
            "ta-IN": {
                title: "நிலநடுக்கப் பாதுகாப்பு",
                steps: ["கீழே குனியவும், மறைந்து கொள்ளவும்", "ஜன்னல்களிலிருந்து விலகி இருக்கவும்", "வெளியே ஓட வேண்டாம்", "தலையைப் பாதுகாக்கவும்"],
                equipment: ["தலைக்கவசம்", "விசில்", "முதலுதவி பெட்டி"]
            }
        }
    },
    {
        id: "SOP-04",
        category: "Gas Leak",
        icon: <Skull className="text-purple-500" />,
        translations: {
            "en-US": {
                title: "Chemical/Gas Leak",
                steps: ["Move upwind immediately", "Cover nose with wet cloth", "Seal doors and windows", "Wait for official clearance"],
                equipment: ["Wet Cloth", "Adhesive Tape", "Radio"]
            },
            "mr-IN": {
                title: "गॅस गळती सुरक्षा",
                steps: ["वाऱ्याच्या विरुद्ध दिशेने जा", "ओल्या कपड्याने नाक झाकून घ्या", "खिडक्या आणि दरवाजे बंद करा", "अधिकृत सूचनेची वाट पाहा"],
                equipment: ["ओला कपडा", "चिकट पट्टी", "रेडिओ"]
            },
            "hi-IN": {
                title: "गैस रिसाव सुरक्षा",
                steps: ["हवा की विपरीत दिशा में चलें", "गीले कपड़े से नाक ढंकें", "दरवाजे और खिड़कियां बंद करें", "सूचना का इंतजार करें"],
                equipment: ["गीला कपड़ा", "टेप", "रेडियो"]
            },
            "ta-IN": {
                title: "வாயு கசிவு பாதுகாப்பு",
                steps: ["காற்றின் திசைக்கு எதிராக செல்லவும்", "ஈரமான துணியால் மூக்கை மூடவும்", "ஜன்னல்களை மூடவும்", "அறிவிப்புக்காக காத்திருக்கவும்"],
                equipment: ["ஈரமான துணி", "ஒட்டும் நாடா", "வானொலி"]
            }
        }
    }
];

const supportedLanguages = [
    { code: 'en-US', label: 'English' },
    { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
    { code: 'mr-IN', label: 'मराठी (Marathi)' },
    { code: 'ta-IN', label: 'தமிழ் (Tamil)' }
];

function SOPManuals() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSOP, setSelectedSOP] = useState(null);
    const [selectedLang, setSelectedLang] = useState('en-US');
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = selectedLang;
        utterance.rate = 0.85;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    const stopSpeech = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const getActiveData = (sop) => sop.translations[selectedLang] || sop.translations['en-US'];

    return (
        <main className="flex-grow p-6 md:p-10 bg-[#fffdf1] overflow-y-auto h-screen custom-scrollbar">
            <header className="mb-10">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">SOP Library</h1>
                <p className="text-slate-500 font-medium">Verified procedures for instant disaster relief.</p>
            </header>

            {/* Search Bar */}
            <div className="relative max-w-xl mb-12">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by protocol name..." 
                    className="w-full pl-12 pr-4 py-4 rounded-3xl bg-white border border-orange-100 shadow-xl shadow-orange-100/20 outline-none font-bold text-sm focus:ring-2 focus:ring-orange-500 transition-all"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Protocols Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sopLibrary.filter(sop => getActiveData(sop).title.toLowerCase().includes(searchTerm.toLowerCase())).map(sop => {
                    const data = getActiveData(sop);
                    return (
                        <div key={sop.id} onClick={() => setSelectedSOP(sop)} className="bg-white p-8 rounded-[3rem] border border-slate-50 shadow-2xl shadow-slate-200/40 cursor-pointer hover:border-orange-500 hover:-translate-y-1 transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-orange-50 transition-colors">{sop.icon}</div>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{sop.id}</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-4">{data.title}</h3>
                            <div className="flex items-center text-orange-600 font-black text-xs uppercase tracking-wider">
                                View Full Protocol <ChevronRight size={16} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Multilingual Detail Modal */}
            {selectedSOP && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#fffdf1] w-full max-w-3xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 max-h-[90vh] flex flex-col">
                        
                        {/* Modal Header */}
                        <div className="p-8 border-b border-orange-100 flex justify-between items-center bg-white">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-orange-50 rounded-2xl text-orange-600">{selectedSOP.icon}</div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800">{getActiveData(selectedSOP).title}</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Languages size={14} className="text-orange-500" />
                                        <select 
                                            className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-transparent outline-none cursor-pointer hover:text-orange-600"
                                            value={selectedLang}
                                            onChange={(e) => { stopSpeech(); setSelectedLang(e.target.value); }}
                                        >
                                            {supportedLanguages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => isSpeaking ? stopSpeech() : speak(`${getActiveData(selectedSOP).title}. ${getActiveData(selectedSOP).steps.join(". ")}`)}
                                    className={`p-3 rounded-2xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all ${isSpeaking ? 'bg-red-500 text-white shadow-lg' : 'bg-slate-900 text-white shadow-lg'}`}
                                >
                                    {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                    {isSpeaking ? 'Stop' : 'Read Aloud'}
                                </button>
                                <button onClick={() => { stopSpeech(); setSelectedSOP(null); }} className="p-2 text-slate-300 hover:text-slate-800 transition-colors"><X size={28} /></button>
                            </div>
                        </div>
                        
                        {/* Modal Content - Sequential Action Cards */}
                        <div className="p-10 overflow-y-auto custom-scrollbar">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 ml-2">Mandatory Execution Steps</h4>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                {getActiveData(selectedSOP).steps.map((step, i) => (
                                    <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-orange-50 shadow-sm flex gap-4 items-start hover:border-orange-500 transition-all group relative">
                                        <div className="w-10 h-10 shrink-0 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-sm group-hover:bg-orange-500 transition-colors">{i + 1}</div>
                                        <p className="text-sm font-bold text-slate-700 leading-relaxed pr-8">{step}</p>
                                        <button onClick={() => speak(step)} className="absolute bottom-4 right-4 text-slate-200 hover:text-orange-500 transition-colors"><Play size={16} fill="currentColor"/></button>
                                    </div>
                                ))}
                            </div>

                            {/* Equipment Card */}
                            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Package size={14} className="text-orange-500"/> Required Supplies
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {getActiveData(selectedSOP).equipment.map((item, i) => (
                                            <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black text-slate-600">{item}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full md:w-64 bg-red-50 p-6 rounded-[2.5rem] border border-red-100">
                                    <div className="flex items-center gap-2 mb-2 text-red-600">
                                        <ShieldAlert size={18} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Safety First</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-red-700 uppercase leading-relaxed">Scene safety is mandatory before relief operations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default SOPManuals;