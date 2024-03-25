import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { HomePage } from './components/HomePage';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { AddMember } from './components/AddMember';
import { EditMember } from './components/EditMember';
import useToken from './store/useToken';

function RootLayout(props) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  );
}

function App() {

  const { token } = useToken();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: token ? <HomePage key="home" /> : <Navigate to="/login" />
        },
        {
          path: "/addnewmember",
          element: token ? <AddMember key="addnewmember" /> : <Navigate to="/login" />
        },
        {
          path: "/editmember",
          element: token ? <EditMember key="editmember" /> : <Navigate to="/login" />
        }
      ]
    },
    {
      path: "/login",
      element: token ? <Navigate to="/" /> : <Login key="login" />
    }
  ]);



  return (
    <RouterProvider router={router} />
  );
}

export default App;
