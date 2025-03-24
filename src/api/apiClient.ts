import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.inpeak.kr/api',
  headers: { 'Content-Type': 'application/json' },
});
