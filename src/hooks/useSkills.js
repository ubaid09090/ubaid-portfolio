// src/hooks/useSkills.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../redux/slices/skillSlice";

export const useSkills = () => {
  const dispatch = useDispatch();
  const { skills, loading, error } = useSelector((state) => state.skills);

  const getAllSkills = () => {
    dispatch(fetchSkills());
  };

  const createNewSkill = (data) => {
    return dispatch(createSkill(data)).unwrap();
  };

  const updateExistingSkill = (id, data) => {
    return dispatch(updateSkill({ id, skillData: data })).unwrap();
  };

  const deleteExistingSkill = (id) => {
    return dispatch(deleteSkill(id)).unwrap();
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  useEffect(() => {
    if (skills.length === 0) {
      getAllSkills();
    }
  }, []);

  return {
    skills,
    skillsByCategory,
    loading,
    error,
    getAllSkills,
    createSkill: createNewSkill,
    updateSkill: updateExistingSkill,
    deleteSkill: deleteExistingSkill,
  };
};

export default useSkills;
