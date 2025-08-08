import axios from 'axios';

export async function refreshAccessToken(silent: boolean = true): Promise<boolean> {
  const baseURL = import.meta.env.VITE_API_BASE_URL as string;
  const devRefreshToken = import.meta.env.VITE_REFRESH_TOKEN as string | undefined;

  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (import.meta.env.DEV && devRefreshToken) {
      headers.Authorization = `Bearer ${devRefreshToken}`;
    }

    await axios.post(
      `${baseURL}/auth/reissue/token`,
      {},
      {
        headers,
        withCredentials: true,
      },
    );

    return true;
  } catch (e) {
    if (!silent && import.meta.env.DEV) {
      console.warn('토큰 재발급 실패:', e);
    }
    return false;
  }
}
