import React, { ReactNode, createContext, useEffect, useState } from 'react';

interface UserContextType {
  token: string;
  email: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [token, setToken] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const existingToken = localStorage.getItem('token') ? localStorage.getItem('token') as string : '';
    const existingEmail = localStorage.getItem('email') ? localStorage.getItem('email') as string : '';
    setToken(existingToken);
    setEmail(existingEmail);
  }, []);

  return (
    <UserContext.Provider value={{ token, email, setToken, setEmail }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;
