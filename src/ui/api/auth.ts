// In your Vite app (src/api/auth.ts)
const API_BASE_URL = 'https://next-fiscalgem.vercel.app//api/auth';

export const login = async (credentials: { email: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/callback/credentials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...credentials,
      redirect: false,
    }),
    credentials: 'include', // Important for cookies
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  console.log("Response", response);
  

  return response.json();
};

export const getSession = async () => {
  const response = await fetch(`${API_BASE_URL}/session`, {
    credentials: 'include',
  });
  return response.json();
};

export const logout = async () => {
  await fetch(`${API_BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include',
  });
};