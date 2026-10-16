// src/components/sections/admin/AdminProjects.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaUpload,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import LoadingSpinner from "../../common/LoadingSpinner";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../../redux/slices/projectSlice";

// ✅ Import all project images
import britanniaAirport from "../../../assets/images/projects/britannia-airport.png";
import khanshopEase from "../../../assets/images/projects/khanshop-ease.png";
import hostingByUbaid from "../../../assets/images/projects/hosting-by-ubaid.png";
import gatwickTaxi from "../../../assets/images/projects/gatwick-taxi.png";
import qmhTech from "../../../assets/images/projects/qmh-tech.png";

// ✅ Image mapping by project ID
const projectImages = {
  1: britanniaAirport,
  2: khanshopEase,
  3: hostingByUbaid,
  4: gatwickTaxi,
  5: qmhTech,
};

// ✅ Image mapping by name
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

// ✅ Function to get project image
const getProjectImage = (project) => {
  if (project.id && projectImages[project.id]) {
    return projectImages[project.id];
  }
  
  if (project.image) {
    if (project.image.startsWith('http') || project.image.startsWith('/')) {
      return project.image;
    }
    const imageName = project.image.split('/').pop();
    if (imageMap[imageName]) {
      return imageMap[imageName];
    }
    if (imageMap[project.image]) {
      return imageMap[project.image];
    }
    return `/assets/images/projects/${project.image}`;
  }
  
  return britanniaAirport;
};

const AdminProjects = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projects);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    image: "",
  });

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // ✅ Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Remove image
  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, image: "" });
  };

  // ✅ Handle form submit
  const handleSubmit = async () => {
    try {
      const data = {
        ...formData,
        technologies: formData.technologies.split(",").map((t) => t.trim()),
      };

      // ✅ Validate image
      if (!editingProject && !data.image) {
        toast.error("Please select an image for the project");
        return;
      }

      if (editingProject) {
        await dispatch(
          updateProject({ id: editingProject.id, projectData: data })
        ).unwrap();
        toast.success("Project updated successfully!");
      } else {
        await dispatch(createProject(data)).unwrap();
        toast.success("Project created successfully!");
      }
      setIsModalOpen(false);
      setEditingProject(null);
      resetForm();
      dispatch(fetchProjects());
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await dispatch(deleteProject(id)).unwrap();
        toast.success("Project deleted successfully!");
        dispatch(fetchProjects());
      } catch (error) {
        toast.error(error || "Failed to delete project");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      technologies: "",
      liveUrl: "",
      githubUrl: "",
      featured: false,
      image: "",
    });
    setImagePreview(null);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create, edit, and delete projects
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingProject(null);
            resetForm();
            setIsModalOpen(true);
          }}
          icon={FaPlus}
        >
          Add Project
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <FaSearch size={16} />
        </div>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Projects Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={getProjectImage(project)}
                        alt={project.title}
                        className="w-10 h-10 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.src = britanniaAirport;
                        }}
                      />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {project.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.featured
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {project.featured ? "Featured" : "Normal"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {project.createdAt
                      ? new Date(project.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          window.open(`/projects/${project.id}`, "_blank")
                        }
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="View"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setFormData({
                            title: project.title,
                            description: project.description || "",
                            category: project.category || "",
                            technologies: project.technologies?.join(", ") || "",
                            liveUrl: project.liveUrl || "",
                            githubUrl: project.githubUrl || "",
                            featured: project.featured || false,
                            image: project.image || "",
                          });
                          // Set image preview if exists
                          if (project.image) {
                            const img = getProjectImage(project);
                            if (typeof img === 'string' && img.startsWith('data:image')) {
                              setImagePreview(img);
                            } else {
                              setImagePreview(null);
                            }
                          } else {
                            setImagePreview(null);
                          }
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal with Image Upload */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
          resetForm();
        }}
        title={editingProject ? "Edit Project" : "Add New Project"}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4 max-h-[70vh] overflow-y-auto"
        >
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Image *
            </label>
            <div className="flex flex-col items-center justify-center w-full">
              {imagePreview ? (
                <div className="relative w-full">
                  <img
                    src={imagePreview}
                    alt="Project preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaUpload className="text-4xl text-gray-400 mb-2" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, WEBP (Max 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({ ...formData, technologies: e.target.value })
              }
              placeholder="React, Redux, Tailwind"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Live URL
              </label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) =>
                  setFormData({ ...formData, liveUrl: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Featured Project
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="submit">
              {editingProject ? "Update Project" : "Create Project"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setEditingProject(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminProjects;