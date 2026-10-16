// src/hooks/useTheme.js
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setTheme } from "../redux/slices/themeSlice";

export const useTheme = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const isDark = theme === "dark";
  const isLight = theme === "light";

  const toggle = () => {
    dispatch(toggleTheme());
  };

  const setDark = () => {
    dispatch(setTheme("dark"));
  };

  const setLight = () => {
    dispatch(setTheme("light"));
  };

  return {
    theme,
    isDark,
    isLight,
    toggle,
    setDark,
    setLight,
  };
};

export default useTheme;
