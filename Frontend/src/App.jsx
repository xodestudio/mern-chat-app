import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
