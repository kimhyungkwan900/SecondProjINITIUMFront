import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthContextProvider } from './hooks/useAuth.jsx';
import createAppRouter from './router/createAppRouter';


const appRouter = createAppRouter();

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={appRouter} />
    </AuthContextProvider>
  );
}

export default App;