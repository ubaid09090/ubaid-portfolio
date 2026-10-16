// src/components/sections/about/ExperienceSection.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExperiences } from "../../../redux/slices/experienceSlice";
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaCheckCircle,
  FaBuilding,
  FaClock,
  FaMedal,
  FaAward
} from "react-icons/fa";
import LoadingSpinner from "../../common/LoadingSpinner";

const ExperienceSection = () => {
  const dispatch = useDispatch();
  const { experiences, loading } = useSelector((state) => state.experiences);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ✅ Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-full mb-4 tracking-wider">
            CAREER PATH
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-4">
            A journey of growth, learning, and delivering exceptional results
          </p>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <FaBriefcase className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No experience added yet.</p>
          </div>
        ) : (
          <div className="relative">
            {/* ✅ Horizontal Timeline Layout */}
            <div className="hidden md:flex justify-between items-start relative mb-12">
              {/* Timeline Line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
              
              {experiences.map((exp, index) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveIndex(index)}
                  className={`flex flex-col items-center relative z-10 cursor-pointer group transition-all duration-300 ${
                    activeIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                    activeIndex === index
                      ? 'border-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl shadow-blue-500/30'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 group-hover:border-blue-400'
                  }`}>
                    <FaBriefcase className={`text-xl transition-all duration-300 ${
                      activeIndex === index ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500'
                    }`} />
                  </div>
                  <span className={`text-xs font-medium mt-2 transition-all duration-300 ${
                    activeIndex === index ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {exp.company?.substring(0, 12)}
                  </span>
                </button>
              ))}
            </div>

            {/* ✅ Active Experience Card - Modern Design */}
            {experiences[activeIndex] && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-3xl transition-all duration-500">
                <div className="grid md:grid-cols-5 gap-0">
                  
                  {/* Left - Gradient Sidebar */}
                  <div className="md:col-span-1 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-500 p-6 md:p-8 flex flex-col items-center justify-center text-white">
                    <div className="text-5xl font-bold opacity-20">
                      {String(activeIndex + 1).padStart(2, '0')}
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mt-4">
                      <FaBriefcase className="text-2xl" />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm opacity-80">Current Role</p>
                      {experiences[activeIndex].current && (
                        <span className="inline-block mt-2 px-3 py-1 bg-green-400/30 text-green-200 text-xs font-semibold rounded-full backdrop-blur-sm">
                          ● Active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right - Content */}
                  <div className="md:col-span-4 p-6 md:p-8">
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                          {experiences[activeIndex].position}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <FaBuilding className="text-blue-600 dark:text-blue-400" size={16} />
                          <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                            {experiences[activeIndex].company}
                          </p>
                        </div>
                      </div>
                      {experiences[activeIndex].current && (
                        <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          Currently Working
                        </span>
                      )}
                    </div>

                    {/* Meta Info - Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <FaCalendarAlt className="text-blue-600 dark:text-blue-400" size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{experiences[activeIndex].period}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                          <FaMapMarkerAlt className="text-red-600 dark:text-red-400" size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{experiences[activeIndex].location}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <FaClock className="text-purple-600 dark:text-purple-400" size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {experiences[activeIndex].current ? 'Full-time' : 'Contract'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                    {/* Responsibilities - Grid Layout */}
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FaCheckCircle className="text-blue-600 dark:text-blue-400" />
                        Key Responsibilities & Achievements
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {experiences[activeIndex].description?.map((item, i) => (
                          <div 
                            key={i} 
                            className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group cursor-default"
                          >
                            <span className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-125 transition-transform duration-200">
                              <FaCheckCircle size={14} />
                            </span>
                            <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaMedal className="text-yellow-500" />
                        <span>Experience: {activeIndex + 1} of {experiences.length}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                          disabled={activeIndex === 0}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => setActiveIndex(Math.min(experiences.length - 1, activeIndex + 1))}
                          disabled={activeIndex === experiences.length - 1}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-lg shadow-blue-500/25"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ✅ Mobile View - Stacked Cards */}
            <div className="md:hidden space-y-6 mt-8">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.position}</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><FaCalendarAlt size={12} /> {exp.period}</span>
                    <span className="flex items-center gap-1"><FaMapMarkerAlt size={12} /> {exp.location}</span>
                    {exp.current && <span className="text-green-500 font-semibold">● Current</span>}
                  </div>
                  <ul className="space-y-2">
                    {exp.description?.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FaCheckCircle className="text-blue-500 mt-0.5 flex-shrink-0" size={12} />
                        {item}
                      </li>
                    ))}
                    {exp.description?.length > 3 && (
                      <li className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        +{exp.description.length - 3} more responsibilities
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;