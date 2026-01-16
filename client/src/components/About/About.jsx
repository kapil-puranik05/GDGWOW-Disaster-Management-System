import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Custom CSS for specific Swiper overrides if needed (optional)
const customSwiperStyles = `
  .swiper-pagination-bullet-active {
    background-color: #DD6B20 !important; /* Tailwind orange-600 */
  }
  .swiper-button-next, .swiper-button-prev {
    color: #1A365D !important; /* Tailwind blue-900 */
  }
`;

const AboutUs = () => {
  const missions = [
    {
      title: "Rapid Response",
      description: "Deploying specialized teams and emergency supplies within the first 24–48 hours of a disaster zone touchdown.",
      icon: "🚨",
      metric: "Goal: <24h Deployment"
    },
    {
      title: "Resilient Infrastructure",
      description: "Partnering with local engineers to rebuild homes and schools using sustainable materials that withstand future shocks.",
      icon: "🏗️",
      metric: "Focus: Long-term Safety"
    },
    {
      title: "Community Training",
      description: "Educating local leaders on first aid, evacuation protocols, and early warning system technology.",
      icon: "📢",
      metric: "Impact: 50k+ Trained"
    },
     {
      title: "Resource Logistics",
      description: "Bridging the gap between global donors and local needs through a transparent supply chain.",
      icon: "📦",
      metric: "Method: Data-driven Aid"
    }
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 md:px-20 relative overflow-hidden">
      {/* Inject custom swiper styles */}
      <style>{customSwiperStyles}</style>

      {/* Subtle Background Element (optional decorative blob) */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>

      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <h6 className="text-orange-600 font-bold uppercase tracking-widest mb-3">About Our NGO</h6>
        <h2 className="text-blue-900 text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Mission-Driven Action.</h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
          We are a collective of first responders and engineers. We provide immediate life-saving assistance while building long-term resilience in vulnerable communities.
        </p>
      </div>

      {/* Mission Carousel */}
      <div className="max-w-6xl mx-auto mb-24 relative z-10">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16 !px-4 md:!px-2 pt-4" // Added padding for shadow breathing room
        >
          {missions.map((item, index) => (
            <SwiperSlide key={index} className="h-auto d-flex">
              {/* ENHANCED CARD START */}
              <div className="group bg-white rounded-2xl p-8 
                              shadow-[0_8px_30px_rgb(0,0,0,0.08)] 
                              hover:shadow-[0_20px_40px_rgb(221,107,32,0.15)] 
                              transition-all duration-300 ease-in-out 
                              hover:-translate-y-2 h-full flex flex-col 
                              border-b-4 border-transparent hover:border-orange-500 relative overflow-hidden">
                
                {/* Icon Header - Framed and interactive */}
                <div className="mb-6 relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 text-4xl shadow-sm group-hover:bg-orange-500 text-blue-900 group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <h4 className="text-2xl font-bold mb-4 text-blue-900 group-hover:text-orange-600 transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-gray-600 leading-relaxed mb-8 flex-grow font-medium">
                  {item.description}
                </p>

                {/* Footer Metric - Structured and separated */}
                <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Key Metric</p>
                        <span className="text-lg font-extrabold text-blue-900">
                            {item.metric}
                        </span>
                    </div>
                    {/* Small subtle arrow icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-300 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
              </div>
              {/* ENHANCED CARD END */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Core Values Grid (Slightly updated to match new aesthetic) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto relative z-10">
        {['Neutrality', 'Transparency', 'Innovation', 'Compassion'].map((value, idx) => (
          <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all">
            <h5 className="font-bold text-gray-800 text-lg">{value}</h5>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;