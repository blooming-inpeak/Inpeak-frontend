import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://inpeak.kr',
  headers: { 'Content-Type': 'application/json' },
});
