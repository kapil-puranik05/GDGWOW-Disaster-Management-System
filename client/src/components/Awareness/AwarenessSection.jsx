import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { AlertTriangle, TrendingUp, Clock, Activity, ShieldAlert } from 'lucide-react';

/**
 * FIXED COUNTER COMPONENT
 * Safely updates numbers for React rendering.
 */
const Counter = ({ from = 0, to, duration = 2, suffix = "", className = "" }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (value) => {
          setCount(Math.round(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const AwarenessSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } }
  };

  return (
    <section className="py-24 bg-white text-slate-900 overflow-hidden relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        
        {/* Header Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-5 py-2 rounded-full font-bold uppercase tracking-widest text-xs mb-6 border border-orange-200">
            <ShieldAlert size={14} className="animate-pulse"/>
            Crisis Impact Awareness
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            When Disaster Strikes, <br/>
            <span className="text-orange-600 underline decoration-orange-200 decoration-8 underline-offset-8">
              Seconds Save Lives.
            </span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Global emergency events are increasing in frequency. Our current infrastructure 
            needs an immediate digital upgrade to bridge the survival gap.
          </motion.p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          
          {/* Card 1: Lives */}
          <motion.div 
             variants={itemVariants}
             className="bg-slate-50 border border-slate-100 p-10 rounded-[2rem] hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
          >
            <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-orange-600 mb-8 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-all">
                <Activity size={28} />
            </div>
            <h3 className="text-slate-400 font-bold uppercase tracking-wider text-sm mb-4">Affected Annually</h3>
            <div className="text-5xl font-black text-slate-900 mb-4">
              <Counter from={0} to={200} duration={2} suffix="M+" />
            </div>
            <p className="text-slate-600 font-medium">
              Global citizens requiring immediate relief after sudden-onset disasters.
            </p>
          </motion.div>

          {/* Card 2: Economy */}
          <motion.div 
             variants={itemVariants}
             className="bg-slate-50 border border-slate-100 p-10 rounded-[2rem] hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
          >
            <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                <TrendingUp size={28} />
            </div>
            <h3 className="text-slate-400 font-bold uppercase tracking-wider text-sm mb-4">Economic Damage</h3>
            <div className="text-5xl font-black text-slate-900 mb-4">
              <span className="text-2xl align-top mr-1 font-bold text-blue-600">$</span>
              <Counter from={0} to={380} duration={2.5} suffix="B" />
            </div>
            <p className="text-slate-600 font-medium">
              The staggering cost of rebuilding communities without resilient tech.
            </p>
          </motion.div>

           {/* Card 3: Response Speed */}
           <motion.div 
             variants={itemVariants}
             className="bg-slate-50 border border-slate-100 p-10 rounded-[2rem] hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
          >
            <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-red-600 mb-8 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-all">
                <Clock size={28} />
            </div>
            <h3 className="text-slate-400 font-bold uppercase tracking-wider text-sm mb-4">Response Target</h3>
            <div className="text-5xl font-black text-slate-900 mb-4">
              <Counter from={0} to={60} duration={1.5} suffix="" />
              <span className="text-2xl ml-2 font-black text-red-600">MINS</span>
            </div>
            <p className="text-slate-600 font-medium">
              The target "Golden Hour" where intervention is most effective at saving lives.
            </p>
          </motion.div>
        </div>

        {/* Closing Action Block */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-slate-400"
        >
            <div className="relative z-10">
              <h4 className="text-3xl md:text-4xl font-black mb-8">
                  Preparedness is our only protection.
              </h4>
              <p className="text-slate-400 mb-12 max-w-2xl mx-auto text-lg md:text-xl">
                  Our integrated Web and App platform aims to reduce coordination delays 
                  by 40%. Help us build the future of humanitarian logistics.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-black py-5 px-12 rounded-2xl transition-all hover:-translate-y-1 shadow-lg shadow-orange-500/20 active:scale-95">
                    Donate to the Mission
                </button>
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black py-5 px-12 rounded-2xl transition-all">
                    Partner with our Tech
                </button>
              </div>
            </div>

            {/* Subtle decorative ring */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </motion.div>

      </div>
    </section>
  );
};

export default AwarenessSection;