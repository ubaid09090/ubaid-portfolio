// src/redux/slices/contactSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

export const sendContactMessage = createAsyncThunk(
  "contact/sendContactMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/contact/send", messageData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message",
      );
    }
  },
);

export const fetchMessages = createAsyncThunk(
  "contact/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/admin/messages");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch messages",
      );
    }
  },
);

export const deleteMessage = createAsyncThunk(
  "contact/deleteMessage",
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/admin/messages/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete message",
      );
    }
  },
);

export const markMessageAsRead = createAsyncThunk(
  "contact/markMessageAsRead",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/admin/messages/${id}/read`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark message as read",
      );
    }
  },
);

const initialState = {
  messages: [],
  currentMessage: null,
  loading: false,
  error: null,
  success: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearContactSuccess: (state) => {
      state.success = false;
    },
    clearContactError: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendContactMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter((m) => m.id !== action.payload);
      })
      .addCase(markMessageAsRead.fulfilled, (state, action) => {
        const index = state.messages.findIndex(
          (m) => m.id === action.payload.id,
        );
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      });
  },
});

export const { clearContactSuccess, clearContactError, clearMessages } =
  contactSlice.actions;

export default contactSlice.reducer;
