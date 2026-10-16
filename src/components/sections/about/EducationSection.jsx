// src/components/sections/about/EducationSection.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEducations } from "../../../redux/slices/educationSlice";
import { 
  FaGraduationCap, 
  FaCalendarAlt, 
  FaMapMarkerAlt,
  FaBookOpen,
  FaCheckCircle,
  FaArrowRight,
  FaStar
} from "react-icons/fa";
import LoadingSpinner from "../../common/LoadingSpinner";

const EducationSection = () => {
  const dispatch = useDispatch();
  const { educations, loading } = useSelector((state) => state.educations);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchEducations());
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
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ✅ Section Header - Same as Experience */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              My Education
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Academic <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
            My academic background and qualifications
          </p>
        </div>

        {educations.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
            <FaGraduationCap className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No education added yet.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Add some in the admin panel!</p>
          </div>
        ) : (
          <div className="relative max-w-5xl mx-auto">
            
            {/* ✅ Desktop View - Same as Experience */}
            <div className="hidden md:block">
              {/* Horizontal Timeline */}
              <div className="flex justify-between items-start relative mb-12">
                <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"></div>
                
                {educations.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className={`flex flex-col items-center relative z-10 cursor-pointer group transition-all duration-300 ${
                      activeIndex === index ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                      activeIndex === index
                        ? 'border-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/30'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 group-hover:border-blue-400'
                    }`}>
                      <FaGraduationCap className={`text-xl transition-all duration-300 ${
                        activeIndex === index ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500'
                      }`} />
                    </div>
                    <span className={`text-xs font-medium mt-2 transition-all duration-300 ${
                      activeIndex === index ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {item.institution?.substring(0, 12)}
                    </span>
                  </button>
                ))}
              </div>

              {/* ✅ Active Education Card */}
              {educations[activeIndex] && (
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-3xl transition-all duration-500">
                  <div className="grid md:grid-cols-5 gap-0">
                    
                    {/* Left - Gradient Sidebar */}
                    <div className="md:col-span-1 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-500 p-6 md:p-8 flex flex-col items-center justify-center text-white">
                      <div className="text-5xl font-bold opacity-20">
                        {String(activeIndex + 1).padStart(2, '0')}
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mt-4">
                        <FaGraduationCap className="text-2xl" />
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-sm opacity-80">Education</p>
                        {educations[activeIndex].grade && (
                          <span className="inline-block mt-2 px-3 py-1 bg-yellow-400/30 text-yellow-200 text-xs font-semibold rounded-full backdrop-blur-sm flex items-center gap-1">
                            <FaStar size={10} />
                            {educations[activeIndex].grade}
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
                            {educations[activeIndex].degree}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <FaBookOpen className="text-blue-600 dark:text-blue-400" size={16} />
                            <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                              {educations[activeIndex].institution}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Meta Info - Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <FaCalendarAlt className="text-blue-600 dark:text-blue-400" size={16} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{educations[activeIndex].period}</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <FaMapMarkerAlt className="text-red-600 dark:text-red-400" size={16} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{educations[activeIndex].location}</p>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                      {/* Description */}
                      {educations[activeIndex].description && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FaCheckCircle className="text-blue-600 dark:text-blue-400" />
                            About this Program
                          </h4>
                          <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {educations[activeIndex].description}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <FaGraduationCap className="text-blue-500" />
                          <span>Level: {activeIndex + 1} of {educations.length}</span>
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
                            onClick={() => setActiveIndex(Math.min(educations.length - 1, activeIndex + 1))}
                            disabled={activeIndex === educations.length - 1}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-lg shadow-blue-500/25"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ✅ Mobile View - Stacked Cards */}
            <div className="md:hidden space-y-6 mt-8">
              {educations.map((item, index) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.degree}</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{item.institution}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><FaCalendarAlt size={12} /> {item.period}</span>
                    <span className="flex items-center gap-1"><FaMapMarkerAlt size={12} /> {item.location}</span>
                    {item.grade && <span className="flex items-center gap-1"><FaStar size={12} className="text-yellow-500" /> {item.grade}</span>}
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EducationSection;