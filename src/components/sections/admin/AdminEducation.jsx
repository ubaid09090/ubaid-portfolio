// src/components/sections/admin/AdminEducation.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaEdit, FaTrash, FaGraduationCap } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import LoadingSpinner from "../../common/LoadingSpinner";
import {
  fetchEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../../../redux/slices/educationSlice";

const AdminEducation = () => {
  const dispatch = useDispatch();
  const { educations, loading } = useSelector((state) => state.educations);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    location: "",
    period: "",
    grade: "",
    description: "",
  });

  // ✅ Load education from Redux
  useEffect(() => {
    dispatch(fetchEducations());
  }, [dispatch]);

  // ✅ Handle submit
  const handleSubmit = async () => {
    if (!formData.degree.trim()) {
      toast.error("Degree is required");
      return;
    }
    if (!formData.institution.trim()) {
      toast.error("Institution is required");
      return;
    }
    if (!formData.period.trim()) {
      toast.error("Period is required");
      return;
    }

    try {
      if (editingItem) {
        await dispatch(
          updateEducation({ id: editingItem.id, educationData: formData })
        ).unwrap();
        toast.success("Education updated successfully!");
      } else {
        await dispatch(createEducation(formData)).unwrap();
        toast.success("Education added successfully!");
      }
      setIsModalOpen(false);
      resetForm();
      dispatch(fetchEducations());
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this education entry?")) {
      try {
        await dispatch(deleteEducation(id)).unwrap();
        toast.success("Education deleted successfully!");
        dispatch(fetchEducations());
      } catch (error) {
        toast.error(error || "Failed to delete education");
      }
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      degree: "",
      institution: "",
      location: "",
      period: "",
      grade: "",
      description: "",
    });
    setEditingItem(null);
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
            Manage Education
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, or remove your education history
          </p>
        </div>
        <Button onClick={() => { resetForm(); setIsModalOpen(true); }} icon={FaPlus}>
          Add Education
        </Button>
      </div>

      {educations.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <FaGraduationCap className="text-4xl mx-auto mb-3 text-gray-400" />
          <p>No education added yet.</p>
          <p className="text-sm">Click "Add Education" to create one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu) => (
            <div key={edu.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FaGraduationCap className="text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {edu.institution}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{edu.period}</span>
                    <span>•</span>
                    <span>{edu.location}</span>
                    <span>•</span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                      {edu.grade}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {edu.description}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => {
                      setEditingItem(edu);
                      setFormData(edu);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
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
        onClose={() => { setIsModalOpen(false); resetForm(); }}
        title={editingItem ? "Edit Education" : "Add Education"}
      >
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Degree *
            </label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Institution *
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              placeholder="2021 - 2025"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Grade
            </label>
            <input
              type="text"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              placeholder="CGPA: 3.5/4.0"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="submit">{editingItem ? "Update" : "Add"}</Button>
            <Button variant="secondary" onClick={() => { setIsModalOpen(false); resetForm(); }}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminEducation;