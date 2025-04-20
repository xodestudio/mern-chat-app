import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import ChatWindow from './pages/ChatWindow.jsx';

// Router Configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/:userId',
    element: <ChatWindow />
  },
  {
    path: '/profile',
    element: <Profile />
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
  return <RouterProvider router={router} />;
}

export default App;
