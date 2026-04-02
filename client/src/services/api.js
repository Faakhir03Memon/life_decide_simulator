import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// Add token to headers if it exists
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);
export const fetchAIAdvice = (chatData) => API.post('/ai/advice', chatData);
export const fetchReviews = () => API.get('/reviews');
export const createReview = (reviewData) => API.post('/reviews', reviewData);
export const fetchProfile = () => API.get('/users/profile');
export const saveDecision = (decisionData) => API.post('/users/save-decision', decisionData);
