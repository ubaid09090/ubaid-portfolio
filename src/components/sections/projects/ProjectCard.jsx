// src/components/sections/projects/ProjectCard.jsx
import { Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt } from "react-icons/fa";

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

// ✅ Function to get project image
const getProjectImage = (project) => {
  if (!project) return britanniaAirport;
  
  // If image is already imported (object), return it
  if (typeof project.image === 'object' && project.image !== null) {
    return project.image;
  }
  
  // If image is a string path
  if (typeof project.image === 'string') {
    // Check if it matches our imported images
    const imageKey = project.image.split('/').pop().replace('.png', '');
    if (projectImages[imageKey]) {
      return projectImages[imageKey];
    }
    // Return the string path as fallback
    return project.image;
  }
  
  // Default fallback
  return britanniaAirport;
};

const ProjectCard = ({ project }) => {
  const {
    id,
    title,
    description,
    shortDescription,
    technologies = [],
    liveUrl,
    githubUrl,
    featured,
    date,
    category,
  } = project;

  // ✅ Get the correct image
  const projectImage = getProjectImage(project);

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2">
      {/* Image */}
      <Link to={`/projects/${id}`} className="block relative overflow-hidden">
        <div className="relative h-48">
          <img
            src={projectImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              // ✅ Fallback if image fails to load
              e.target.src = britanniaAirport;
            }}
          />
          {featured && (
            <span className="absolute top-3 right-3 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full shadow-lg">
              Featured
            </span>
          )}
          {category && (
            <span className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 text-white text-xs font-medium rounded-full">
              {category}
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link to={`/projects/${id}`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {truncateText(shortDescription || description || "")}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
              +{technologies.length - 4}
            </span>
          )}
        </div>

        {/* Date */}
        {date && (
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500 mb-3">
            <FaCalendarAlt size={12} />
            <span>{date}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/projects/${id}`}
            className="flex-1 text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            View Details
          </Link>
          {(liveUrl || githubUrl) && (
            <div className="flex gap-2">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                  title="Live Demo"
                >
                  <FaExternalLinkAlt size={16} />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                  title="GitHub Repository"
                >
                  <FaGithub size={16} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;