// src/components/sections/admin/AdminSkills.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import LoadingSpinner from "../../common/LoadingSpinner";
import {
  fetchSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../../redux/slices/skillSlice";

const AdminSkills = () => {
  const dispatch = useDispatch();
  const { skills, loading } = useSelector((state) => state.skills);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    level: 50,
    category: "Frontend",
    color: "#3b82f6",
  });

  // ✅ Load skills from Redux
  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  // ✅ Handle form submit - Add or Update
  const handleSubmit = async () => {
    // ✅ Validate
    if (!formData.name.trim()) {
      toast.error("Skill name is required");
      return;
    }

    try {
      if (editingSkill) {
        // ✅ Update existing skill
        await dispatch(
          updateSkill({ id: editingSkill.id, skillData: formData })
        ).unwrap();
        toast.success("Skill updated successfully!");
      } else {
        // ✅ Create new skill
        await dispatch(createSkill(formData)).unwrap();
        toast.success("Skill created successfully!");
      }
      setIsModalOpen(false);
      resetForm();
      // ✅ Refresh list
      dispatch(fetchSkills());
    } catch (error) {
      toast.error(error || "Something went wrong");
      console.error("Error saving skill:", error);
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await dispatch(deleteSkill(id)).unwrap();
        toast.success("Skill deleted successfully!");
        dispatch(fetchSkills());
      } catch (error) {
        toast.error(error || "Failed to delete skill");
        console.error("Error deleting skill:", error);
      }
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      level: 50,
      category: "Frontend",
      color: "#3b82f6",
    });
    setEditingSkill(null);
  };

  // ✅ Filter skills
  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            Manage Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, or remove your technical skills
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          icon={FaPlus}
        >
          Add Skill
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <FaSearch size={16} />
        </div>
        <input
          type="text"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
            No skills found. Click "Add Skill" to create one.
          </div>
        ) : (
          filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${skill.color}20` }}
                  >
                    <span
                      className="text-xl font-bold"
                      style={{ color: skill.color }}
                    >
                      {skill.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {skill.name}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditingSkill(skill);
                      setFormData({
                        name: skill.name,
                        level: skill.level,
                        category: skill.category,
                        color: skill.color,
                      });
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Edit"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${skill.level}%`,
                      backgroundColor: skill.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingSkill ? "Edit Skill" : "Add New Skill"}
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
              Skill Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. React.js"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Styling">Styling</option>
              <option value="State Management">State Management</option>
              <option value="Language">Language</option>
              <option value="Framework">Framework</option>
              <option value="Tools">Tools</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Proficiency Level: {formData.level}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color
            </label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="submit">
              {editingSkill ? "Update Skill" : "Create Skill"}
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

export default AdminSkills;