// src/__tests__/redux/authSlice.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  login,
  register,
  logout,
  verifyToken,
  clearError,
} from "../../redux/slices/authSlice";
import apiClient from "../../services/apiClient";

// Mock apiClient
vi.mock("../../services/apiClient", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("authSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { auth: authReducer },
    });
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should handle initial state", () => {
    const state = store.getState().auth;
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  describe("login thunk", () => {
    const credentials = { email: "test@example.com", password: "password123" };
    const mockResponse = {
      data: {
        success: true,
        data: {
          token: "mock-token",
          user: { id: 1, name: "Test User", email: "test@example.com" },
        },
      },
    };

    it("should handle login pending", async () => {
      apiClient.post.mockImplementation(() => new Promise(() => {}));
      store.dispatch(login(credentials));

      const state = store.getState().auth;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should handle login fulfilled", async () => {
      apiClient.post.mockResolvedValue(mockResponse);

      await store.dispatch(login(credentials));

      const state = store.getState().auth;
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockResponse.data.data.user);
      expect(state.error).toBeNull();
      expect(localStorage.getItem("token")).toBe("mock-token");
    });

    it("should handle login rejected", async () => {
      const errorMessage = "Invalid credentials";
      apiClient.post.mockRejectedValue({
        response: { data: { message: errorMessage } },
      });

      await store.dispatch(login(credentials));

      const state = store.getState().auth;
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.error).toBe(errorMessage);
    });
  });

  describe("logout action", () => {
    it("should handle logout", () => {
      // Set initial state with authenticated user
      store = configureStore({
        reducer: { auth: authReducer },
        preloadedState: {
          auth: {
            user: { id: 1, name: "Test User" },
            isAuthenticated: true,
            loading: false,
            error: null,
          },
        },
      });

      localStorage.setItem("token", "mock-token");
      localStorage.setItem("user", JSON.stringify({ id: 1 }));

      store.dispatch(logout());

      const state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("user")).toBeNull();
    });
  });

  describe("clearError action", () => {
    it("should clear error", () => {
      store = configureStore({
        reducer: { auth: authReducer },
        preloadedState: {
          auth: {
            user: null,
            isAuthenticated: false,
            loading: false,
            error: "Some error message",
          },
        },
      });

      store.dispatch(clearError());

      const state = store.getState().auth;
      expect(state.error).toBeNull();
    });
  });
});
