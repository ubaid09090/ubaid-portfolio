// src/components/sections/home/FeaturedProjects.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { fetchProjects } from "../../../redux/slices/projectSlice";
import LoadingSpinner from "../../common/LoadingSpinner";

// ✅ Import images directly
import britanniaAirport from "../../../assets/images/projects/britannia-airport.png";
import khanshopEase from "../../../assets/images/projects/khanshop-ease.png";
import hostingByUbaid from "../../../assets/images/projects/hosting-by-ubaid.png";
import gatwickTaxi from "../../../assets/images/projects/gatwick-taxi.png";
import qmhTech from "../../../assets/images/projects/qmh-tech.png";

// ✅ Image mapping
const imageMap = {
  "britannia-airport": britanniaAirport,
  "khanshop-ease": khanshopEase,
  "hosting-by-ubaid": hostingByUbaid,
  "gatwick-taxi": gatwickTaxi,
  "qmh-tech": qmhTech,
  "britannia-airport.png": britanniaAirport,
  "khanshop-ease.png": khanshopEase,
  "hosting-by-ubaid.png": hostingByUbaid,
  "gatwick-taxi.png": gatwickTaxi,
  "qmh-tech.png": qmhTech,
};

const FeaturedProjects = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

  if (loading) {
    return (
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Featured{" "}
              <span className="text-blue-600 dark:text-blue-400">Projects</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Some of my best work
            </p>
          </div>
          <Link
            to="/projects"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1"
          >
            View All <FaArrowRight />
          </Link>
        </div>

        {featuredProjects.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No featured projects yet. Add some in the admin panel!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  // ✅ Get correct image
  const getImage = () => {
    if (!project.image) {
      return "/assets/images/projects/placeholder.png";
    }
    
    // If image is a string path
    if (typeof project.image === 'string') {
      // Check if it's in our image map
      const imageName = project.image.split('/').pop();
      if (imageMap[imageName]) {
        return imageMap[imageName];
      }
      if (imageMap[project.image]) {
        return imageMap[project.image];
      }
      // Return as is if it's a URL or absolute path
      if (project.image.startsWith('http') || project.image.startsWith('/')) {
        return project.image;
      }
      return `/assets/images/projects/${project.image}`;
    }
    
    return project.image || "/assets/images/projects/placeholder.png";
  };

  const imageSrc = getImage();

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={imageSrc}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            console.log('Image failed to load:', imageSrc);
            e.target.src = "/assets/images/projects/placeholder.png";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
          <div className="flex gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaExternalLinkAlt className="text-gray-700" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaGithub className="text-gray-700" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
          {project.shortDescription || project.description?.substring(0, 100) + "..." || ""}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;