import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Function to api_url
export const server_url = async () => {
  return API_URL;
};

// Function to handle login
export const login = async (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

// Function to get current user
export const getMe = async (token) => {
  return axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to fetch users
export const getUsers = async (token) => {
  return axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to update a user
export const updateUser = async (userId, userData, token) => {
  return axios.put(`${API_URL}/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to get the current queue
export const getQueue = async (data) => {
  return axios.post(`${API_URL}/queue/get_que`, data, {
    headers: {
      Accept: 'application/json',
      ContentType: 'application/json',
    },
  });
};

// Function to get the currently serving queue item
export const getServing = async () => {
  return axios.get(`${API_URL}/queue/serving`);
};

// Function to get the next queue item
export const getNext = async (token) => {
  return axios.get(`${API_URL}/queue/next`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to get the previous queue item
export const getPrevious = async (token) => {
  return axios.get(`${API_URL}/queue/previous`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to reset the queue
export const resetQueue = async (token) => {
  return axios.get(`${API_URL}/queue/reset`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
