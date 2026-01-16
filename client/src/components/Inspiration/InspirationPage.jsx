import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, TrendingUp, Clock, Activity, 
  ShieldAlert, Smartphone, Monitor, Map, Zap,
  ChevronRight, Heart, Globe, Users
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/** --- Utility: Counter Component --- **/
const Counter = ({ from = 0, to, duration = 2, suffix = "", className = "" }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (value) => setCount(Math.round(value)),
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref} className={className}>{count.toLocaleString()}{suffix}</span>;
};

/** --- Section 1: Hero Impact (Awareness) --- **/
const HeroAwareness = () => (
  <section className="relative py-24 bg-white overflow-hidden border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -30 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-red-100">
          <AlertTriangle size={14} /> Global Crisis Status: Critical
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1]">
          Helping Humanity <br/>
          <span className="text-orange-600">Outrun Disaster.</span>
        </h1>
        <p className="text-xl text-slate-500 mb-10 leading-relaxed">
          The scale of modern disasters is outpacing our ability to respond. We bridge the survival gap with real-time data and rapid ground mobilization.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-slate-900 text-white font-bold py-4 px-8 rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            Join the Response
          </button>
          <button className="flex items-center gap-2 text-slate-900 font-bold py-4 px-8 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">
            See Live Data <ChevronRight size={18}/>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Lives Displaced", val: 200, suf: "M", icon: <Users/>, color: "text-blue-600" },
          { label: "Economic Loss", val: 380, suf: "B", icon: <TrendingUp/>, color: "text-orange-600" },
          { label: "Response Time", val: 60, suf: "m", icon: <Clock/>, color: "text-red-600" },
          { label: "Countries Active", val: 45, suf: "+", icon: <Globe/>, color: "text-green-600" },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-center"
          >
            <div className={`${stat.color} flex justify-center mb-4`}>{stat.icon}</div>
            <div className="text-3xl font-black text-slate-900 mb-1">
              <Counter from={0} to={stat.val} suffix={stat.suf} />
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/** --- Section 2: Our Mission (Carousel) --- **/
const MissionSection = () => {
  const missions = [
    { title: "Rapid Response", desc: "Deployment within 24-48 hours of initial crisis detection.", icon: "🚨", metric: "First Strike Aid" },
    { title: "Smart Logistics", desc: "Using AI to predict resource needs before they become critical.", icon: "📦", metric: "Zero Waste Aid" },
    { title: "Tech Resilience", desc: "Providing low-bandwidth apps for communication in dead zones.", icon: "📶", metric: "Offline Support" }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Our Strategic Pillars</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Focused action is the only way to combat decentralized chaos.</p>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          className="pb-16"
        >
          {missions.map((m, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all h-full border border-slate-100 flex flex-col group">
                <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">{m.icon}</span>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{m.title}</h3>
                <p className="text-slate-500 mb-8 flex-grow">{m.desc}</p>
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-sm font-bold text-orange-600">{m.metric}</span>
                  <Heart size={18} className="text-slate-200 group-hover:text-red-500 transition-colors" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

/** --- Section 3: Operations (How We Work) --- **/
const OperationSection = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-6">The Web-App Ecosystem</h2>
          <p className="text-lg text-slate-500 mb-10">
            We operate through a dual-platform system. Our **Mobile App** collects ground-truth data from volunteers, while our **Web Dashboard** coordinates logistics at the executive level.
          </p>
          <div className="space-y-6">
            {[
              { icon: <Smartphone/>, t: "Ground Force Mobile", d: "Real-time incident reporting with GPS & offline sync." },
              { icon: <Monitor/>, t: "Command Center Web", d: "Data visualization and resource allocation tools." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-2xl bg-slate-50 hover:bg-orange-50 transition-colors cursor-default border border-slate-100 hover:border-orange-100">
                <div className="text-orange-600">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.t}</h4>
                  <p className="text-sm text-slate-500">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="bg-orange-100 rounded-[3rem] p-12 aspect-square flex items-center justify-center">
             <div className="text-center">
                <Zap size={80} className="text-orange-600 mx-auto mb-6 animate-bounce" />
                <h3 className="text-2xl font-black text-slate-900 italic">"Technology turns chaos into coordination."</h3>
             </div>
          </div>
          {/* Abstract floating circles */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-60"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-40"></div>
        </div>
      </div>
    </div>
  </section>
);

/** --- Main Page --- **/
const InspirationPage = () => {
  return (
    <main className="font-sans antialiased text-slate-900">
      <HeroAwareness />
      <MissionSection />
      <OperationSection />
      
      {/* Final Call to Action */}
      <section className="py-24 bg-white px-6">
        <motion.div 
          whileInView={{ scale: [0.95, 1] }}
          className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          <h2 className="text-4xl font-black mb-6 relative z-10">Ready to change the narrative?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Whether you are a developer, a first-responder, or a donor, there is a place for you in our digital ecosystem.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-black py-5 px-12 rounded-2xl transition-all relative z-10 hover:shadow-2xl hover:shadow-orange-500/30">
            Start Your Contribution
          </button>
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        </motion.div>
      </section>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-sm">
        &copy; 2026 Disaster Management NGO. All systems operational.
      </footer>
    </main>
  );
};

export default InspirationPage;