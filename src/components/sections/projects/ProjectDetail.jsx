// src/components/sections/projects/ProjectDetail.jsx
import { Link, useParams } from "react-router-dom";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";

// ✅ Import all project images
import britanniaAirport from "../../../assets/images/projects/britannia-airport.png";
import khanshopEase from "../../../assets/images/projects/khanshop-ease.png";
import hostingByUbaid from "../../../assets/images/projects/hosting-by-ubaid.png";
import gatwickTaxi from "../../../assets/images/projects/gatwick-taxi.png";
import qmhTech from "../../../assets/images/projects/qmh-tech.png";

// ✅ Image mapping object
const projectImages = {
  "britannia-airport": britanniaAirport,
  "khanshop-ease": khanshopEase,
  "hosting-by-ubaid": hostingByUbaid,
  "gatwick-taxi": gatwickTaxi,
  "qmh-tech": qmhTech,
};

const ProjectDetail = ({ project, loading = false }) => {
  const { id } = useParams();

  // ✅ Get the correct image for the project
  const getProjectImage = (project) => {
    if (!project) return null;
    // If project has image path, use it
    if (project.image) {
      // Check if it's a string path or imported image
      if (typeof project.image === 'string') {
        // Check if it matches any of our imported images
        const imageKey = project.image.split('/').pop().replace('.png', '');
        if (projectImages[imageKey]) {
          return projectImages[imageKey];
        }
        // If not found, return the string path
        return project.image;
      }
      return project.image;
    }
    // Fallback image
    return britanniaAirport;
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Project Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The project you're looking for doesn't exist.
        </p>
        <Link
          to="/projects"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  // ✅ Get the image for this project
  const projectImage = getProjectImage(project);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors"
      >
        <FaArrowLeft size={16} />
        <span>Back to Projects</span>
      </Link>

      {/* Hero Image */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <img
          src={projectImage}
          alt={project.title}
          className="w-full h-64 md:h-96 object-cover"
          onError={(e) => {
            // ✅ Fallback if image fails to load
            e.target.src = britanniaAirport;
          }}
        />
        {project.featured && (
          <span className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-full shadow-lg">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            {project.date && (
              <span className="flex items-center gap-1">
                <FaCalendarAlt size={14} />
                {project.date}
              </span>
            )}
            {project.duration && (
              <span className="flex items-center gap-1">
                <FaClock size={14} />
                {project.duration}
              </span>
            )}
            {project.category && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                {project.category}
              </span>
            )}
          </div>

          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
              {project.description}
            </p>
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Key Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <FaCheckCircle
                      className="text-green-500 mt-1 flex-shrink-0"
                      size={16}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Project Info
            </h3>

            {/* Technologies */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full border border-gray-200 dark:border-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="space-y-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <FaExternalLinkAlt size={16} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors"
                  >
                    <FaGithub size={16} />
                    View Source
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;