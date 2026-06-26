import axios from "axios";

const API_URL = "https://sokrabecddiicnejkqyf.supabase.co/rest/v1/users";

// Ganti bagian ini dengan anon key Supabase kamu
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNva3JhYmVjZGRpaWNuZWprcXlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMjA2NjAsImV4cCI6MjA5Njg5NjY2MH0.aUZ-AdEhOCLIBwb5aTcUWr4A3FZ5g-pQpTnmlysguyk";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export const usersAPI = {
  async fetchUsers() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createUser(data) {
    try {
      const response = await axios.post(API_URL, data, { headers });
      return response.data;
    } catch (error) {
      console.log("SUPABASE CREATE ERROR:", error.response?.data);
      throw error;
    }
  },

  async updateUser(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
      headers,
    });

    return response.data;
  },

  async deleteUser(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, {
      headers,
    });

    return response.data;
  },

  async loginUser(email, password) {
    const response = await axios.get(
      `${API_URL}?email=eq.${email}&password=eq.${password}`,
      { headers }
    );

    return response.data;
  },
};