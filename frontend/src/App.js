import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { HomePage } from './components/HomePage';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { AddMember } from './components/AddMember';
import { EditMember } from './components/EditMember';

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <HomePage key="home" />
        },
        {
          path: "/addnewmember",
          element: <AddMember key="addnewmember" />
        },
        {
          path: "/editmember",
          element: <EditMember key="editmember" />
        }
      ]
    },
    {
      path: "/login",
      element: <Login key="login" />
    }
  ]);



  return (
    <RouterProvider router={router} />
  );
}

export default App;
