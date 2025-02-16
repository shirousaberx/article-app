import axios from "axios";

const API_URL = "http://localhost:3000/article";

export const fetchArticles = async (limit, offset, status) => {
  const params = {};
  if (status) params.status = status;
  const response = await axios.get(`${API_URL}/${limit}/${offset}`, { params });
  return response.data;
};

export const fetchArticleById = async (article_id) => {
  const response = await axios.get(`${API_URL}/${article_id}`);
  return response.data;
};

export const getArticleById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createArticle = async (data) => {
  return axios.post(API_URL, data);
};

export const updateArticle = async (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteArticle = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
