import { RouterProvider } from 'react-router-dom'
import './App.css'
import { createContext, useEffect, useState } from 'react'
import createAppRouter from './router/createAppRouter';
import axios from 'axios';

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [router, setRouter] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get("/api/auth/me", {withCredentials : true});
        const userData = res.data;
        setUser(userData);
        setRouter(createAppRouter(userData.role));
      } catch (err) {
        console.log("인증 실패 app.jsx",err);
        setUser(null);
        setRouter(createAppRouter(null));
      }
    };

    init();
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {router && <RouterProvider router={router} />}
    </UserContext.Provider>
  )
}

export default App