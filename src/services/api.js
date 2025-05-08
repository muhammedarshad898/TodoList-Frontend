import axios from 'axios';

const API_URL = 'https://todolist-backend-a1c7.onrender.com'; // Base URL with /api

export const api = {
  // Create a new task
  addTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/add`, taskData);
      return response.data;
    } catch (error) {
      console.error('Add task error:', error);
      throw error.response?.data || error.message;
    }
  },

  // Get all tasks
  getTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      return response.data;
    } catch (error) {
      console.error('Get tasks error:', error);
      throw error.response?.data || error.message;
    }
  },

  // Update a task
  updateTask: async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/edit/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error('Update task error:', error);
      throw error.response?.data || error.message;
    }
  },

  // Delete a task
  deleteTask: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete task error:', error);
      throw error.response?.data || error.message;
    }
  },

  // Update task status
  updateStatus: async (id, status) => {
    try {
      const response = await axios.patch(`${API_URL}/status/${id}`, { status });
      return response.data;
    } catch (error) {
      console.error('Update status error:', error);
      throw error.response?.data || error.message;
    }
  }
}; 