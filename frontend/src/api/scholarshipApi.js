import axios from "axios";

const API = "http://localhost:5000/scholarships";
export const getAll = () => axios.get(API);

export const search = (keyword) =>
  axios.get(`${API}/search`, { params: { keyword } });

export const toggleFollow = (id, value) =>
  axios.put(`${API}/${id}/follow`, { is_followed: value });