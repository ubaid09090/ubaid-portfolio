// src/hooks/useExperience.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../redux/slices/experienceSlice";

export const useExperience = () => {
  const dispatch = useDispatch();
  const { experiences, loading, error } = useSelector(
    (state) => state.experiences,
  );

  const getAllExperiences = () => {
    dispatch(fetchExperiences());
  };

  const createNewExperience = (data) => {
    return dispatch(createExperience(data)).unwrap();
  };

  const updateExistingExperience = (id, data) => {
    return dispatch(updateExperience({ id, experienceData: data })).unwrap();
  };

  const deleteExistingExperience = (id) => {
    return dispatch(deleteExperience(id)).unwrap();
  };

  // Get current experience
  const currentExperience = experiences.find((exp) => exp.current);

  useEffect(() => {
    if (experiences.length === 0) {
      getAllExperiences();
    }
  }, []);

  return {
    experiences,
    currentExperience,
    loading,
    error,
    getAllExperiences,
    createExperience: createNewExperience,
    updateExperience: updateExistingExperience,
    deleteExperience: deleteExistingExperience,
  };
};

export default useExperience;
