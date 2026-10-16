// src/__tests__/components/Navbar.test.js
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Navbar from "../../components/common/Navbar";
import themeReducer from "../../redux/slices/themeSlice";

// Mock store for testing
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: {
      theme: { theme: "light", ...initialState },
    },
  });
};

// Helper to render with providers
const renderWithProviders = (component, store) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>,
  );
};

describe("Navbar Component", () => {
  it("renders the navbar with logo", () => {
    const store = createMockStore();
    renderWithProviders(<Navbar />, store);

    expect(screen.getByText("Ubaid")).toBeInTheDocument();
    expect(screen.getByText("Ullah")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    const store = createMockStore();
    renderWithProviders(<Navbar />, store);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Resume")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("toggles mobile menu when hamburger button is clicked", () => {
    const store = createMockStore();
    renderWithProviders(<Navbar />, store);

    // Find mobile menu button (hidden on desktop)
    const menuButton = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(menuButton);

    // Mobile menu should be visible
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("toggles theme when theme button is clicked", () => {
    const store = createMockStore();
    renderWithProviders(<Navbar />, store);

    const themeButton = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(themeButton);

    // Theme should be toggled
    // Check if dark class is applied
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("shows scrolled state after scrolling", () => {
    const store = createMockStore();
    renderWithProviders(<Navbar />, store);

    // Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    // Navbar should have scrolled class
    const navbar = screen.getByRole("navigation");
    expect(navbar).toHaveClass("navbar-scrolled");
  });
});
