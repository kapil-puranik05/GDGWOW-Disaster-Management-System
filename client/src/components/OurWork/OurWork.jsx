import React from 'react';
import { Smartphone, Monitor, Database, Zap, Map } from 'lucide-react';

const OurWork = () => {
  const workflow = [
    {
      step: "01",
      title: "Real-time Reporting",
      platform: "Mobile App",
      description: "Field volunteers and survivors use our app to report incidents, upload photos, and share GPS coordinates—even with low connectivity.",
      icon: <Smartphone className="w-8 h-8 text-orange-500" />,
      color: "border-orange-500"
    },
    {
      step: "02",
      title: "Centralized Analysis",
      platform: "Web Dashboard",
      description: "Data is instantly synced to our central command web portal, where AI algorithms prioritize high-urgency zones and resource needs.",
      icon: <Monitor className="w-8 h-8 text-blue-600" />,
      color: "border-blue-600"
    },
    {
      step: "03",
      title: "Resource Mapping",
      platform: "Web Dashboard",
      description: "Coordinators visualize the crisis via live maps, matching available supplies and medical teams to the precise locations of need.",
      icon: <Map className="w-8 h-8 text-blue-600" />,
      color: "border-blue-600"
    },
    {
      step: "04",
      title: "Agile Deployment",
      platform: "Mobile App",
      description: "Response teams receive optimized routes and digital manifests on their handheld devices for rapid, efficient aid delivery.",
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      color: "border-orange-500"
    }
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-blue-900 text-4xl font-extrabold mb-4">How We Operate</h2>
            <p className="text-gray-600 text-lg">
              We leverage a high-speed digital ecosystem to ensure that help reaches the right person at the right time. Our proprietary web and mobile tools turn data into life-saving action.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-200">
              <Smartphone size={18} className="text-orange-600" />
              <span className="text-sm font-bold text-orange-700">Mobile for Field</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              <Monitor size={18} className="text-blue-600" />
              <span className="text-sm font-bold text-blue-700">Web for Control</span>
            </div>
          </div>
        </div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflow.map((item, index) => (
            <div key={index} className="relative group">
              {/* Connector line for Desktop */}
              {index !== workflow.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 left-full w-full h-[2px] bg-gray-100 z-0 -translate-x-8" />
              )}
              
              <div className={`relative z-10 bg-white p-8 rounded-2xl border-l-8 ${item.color} shadow-sm group-hover:shadow-md transition-shadow`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-gray-50 rounded-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-4xl font-black text-gray-100 group-hover:text-gray-500 transition-colors">
                    {item.step}
                  </span>
                </div>
                
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {item.platform}
                </h4>
                <h3 className="text-xl font-bold text-blue-900 mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-blue-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Interested in our technology?</h3>
            <p className="text-blue-200 mb-8 max-w-xl mx-auto">
              We offer our software as an open-source tool for other local NGOs to help them scale their impact.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg shadow-orange-900/20">
              Partner With Us
            </button>
          </div>
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-800 rounded-full opacity-50"></div>
        </div>
      </div>
    </section>
  );
};

export default OurWork;