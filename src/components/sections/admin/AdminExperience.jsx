// src/components/sections/admin/AdminExperience.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaEdit, FaTrash, FaBriefcase } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import LoadingSpinner from "../../common/LoadingSpinner";
import {
  fetchExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../../redux/slices/experienceSlice";

const AdminExperience = () => {
  const dispatch = useDispatch();
  const { experiences, loading } = useSelector((state) => state.experiences);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    location: "",
    period: "",
    current: false,
    description: [""],
  });

  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!formData.position.trim()) {
      toast.error("Position is required");
      return;
    }
    if (!formData.company.trim()) {
      toast.error("Company is required");
      return;
    }
    if (!formData.period.trim()) {
      toast.error("Period is required");
      return;
    }

    try {
      const filteredDescription = formData.description.filter(d => d.trim() !== "");
      const data = {
        ...formData,
        description: filteredDescription.length > 0 ? filteredDescription : [""],
      };

      if (editingItem) {
        await dispatch(
          updateExperience({ id: editingItem.id, experienceData: data })
        ).unwrap();
        toast.success("Experience updated successfully!");
      } else {
        await dispatch(createExperience(data)).unwrap();
        toast.success("Experience added successfully!");
      }
      setIsModalOpen(false);
      resetForm();
      dispatch(fetchExperiences());
    } catch (error) {
      toast.error(error || "Something went wrong");
      console.error("Error saving experience:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await dispatch(deleteExperience(id)).unwrap();
        toast.success("Experience deleted successfully!");
        dispatch(fetchExperiences());
      } catch (error) {
        toast.error(error || "Failed to delete experience");
        console.error("Error deleting experience:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      position: "",
      company: "",
      location: "",
      period: "",
      current: false,
      description: [""],
    });
    setEditingItem(null);
  };

  const handleDescriptionChange = (index, value) => {
    const newDescription = [...formData.description];
    newDescription[index] = value;
    setFormData({ ...formData, description: newDescription });
  };

  const addDescriptionField = () => {
    setFormData({
      ...formData,
      description: [...formData.description, ""],
    });
  };

  const removeDescriptionField = (index) => {
    if (formData.description.length > 1) {
      const newDescription = formData.description.filter((_, i) => i !== index);
      setFormData({ ...formData, description: newDescription });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, or remove your work experience
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          icon={FaPlus}
        >
          Add Experience
        </Button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <FaBriefcase className="text-4xl mx-auto mb-3 text-gray-400" />
          <p>No experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to create one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FaBriefcase className="text-purple-600 dark:text-purple-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {exp.position}
                    </h3>
                    {exp.current && (
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {exp.company}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{exp.period}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                  </div>
                  <ul className="mt-3 space-y-1">
                    {exp.description.map((item, index) => (
                      <li
                        key={index}
                        className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2"
                      >
                        <span className="text-purple-600 dark:text-purple-400 mt-1">
                          ▸
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => {
                      setEditingItem(exp);
                      setFormData({
                        position: exp.position,
                        company: exp.company,
                        location: exp.location || "",
                        period: exp.period,
                        current: exp.current || false,
                        description: exp.description || [""],
                      });
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Edit"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingItem ? "Edit Experience" : "Add Experience"}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Position *
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
              placeholder="e.g. Front-End Developer"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="e.g. QMH Technologies"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="e.g. Rawalpindi, Pakistan"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Period *
            </label>
            <input
              type="text"
              value={formData.period}
              onChange={(e) =>
                setFormData({ ...formData, period: e.target.value })
              }
              placeholder="Sep 2025 - Present"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.current}
              onChange={(e) =>
                setFormData({ ...formData, current: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Currently working here
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            {formData.description.map((desc, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={desc}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                  placeholder="Enter responsibility or achievement"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.description.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDescriptionField(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <FaTrash size={14} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addDescriptionField}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              + Add another point
            </button>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="submit">
              {editingItem ? "Update Experience" : "Add Experience"}
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                setIsModalOpen(false);
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

export default AdminExperience;