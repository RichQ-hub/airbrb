import { LoginRequest, RegisterRequest } from '../schemas/schemas';
import BACKEND_URL from './BackendUrl';

const BASE_URL = `${BACKEND_URL}/user/auth`;

const parseJSON = async (url: string, options: any) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

class UserAuth {
  registerUser = async (payload: RegisterRequest) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    }

    const response = await parseJSON(`${BASE_URL}/register`, options);
    return response;
  }

  loginUser = async (payload: LoginRequest) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    }

    const response = await parseJSON(`${BASE_URL}/login`, options);
    return response;
  }

  logoutUser = async (token: string) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }

    const response = await parseJSON(`${BASE_URL}/logout`, options);
    return response;
  }
}

export default new UserAuth();
