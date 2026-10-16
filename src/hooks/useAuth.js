// src/hooks/useAuth.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken, logout, clearError } from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth,
  );

  // Verify token on mount
  useEffect(() => {
    if (localStorage.getItem("token") && !user) {
      dispatch(verifyToken());
    }
  }, [dispatch, user]);

  const clearAuthError = () => {
    dispatch(clearError());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    clearAuthError,
    logout: handleLogout,
    isAdmin: user?.role === "admin",
  };
};

export default useAuth;
