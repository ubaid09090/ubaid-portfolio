// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import './index.css';

// ✅ Check dark mode on load
const checkDarkMode = () => {
  const theme = localStorage.getItem('theme');
  console.log('Current theme from localStorage:', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    console.log('Dark mode applied');
  } else {
    document.documentElement.classList.remove('dark');
    console.log('Light mode applied');
  }
};

checkDarkMode();

// ✅ Listen for storage changes (if theme changes in another tab)
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    console.log('Theme changed in another tab:', e.newValue);
    checkDarkMode();
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);