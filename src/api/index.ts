let api;

if (import.meta.env.MODE === 'development') {
  api = await import('./api.dev');
} else {
  api = await import('./api.prod');
}

export default api.default;
