import './App.css';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBAr';
import { useState } from 'react';
import LogingComp from './components/LoginComp';
import { AuthService } from './services/AuthService';

const authService = new AuthService();

function App() {

  const [userName, setUserName] = useState<string | undefined>(undefined);

  const router = createBrowserRouter([
    {
      element:(
        <>
        <NavBar userName={userName}/>
        <Outlet/>
        </>
      ),
      children:[
        {
          path: "/",
          element: <div> Hello world</div>
        },
        {
          path: "/login",
          element: <LogingComp  authService={authService} setUserNameCb={setUserName} />
        },
        {
          path: "/profile",
          element: <div> Profile</div>
        },
        {
          path: "/createSpace",
          element: <div> Create Space</div>
        },
        {
          path: "/spaces",
          element: <div> Spaces</div>
        },
      ]
    }
  ])

  return (
    <>
      <div className='App'>
      <RouterProvider router={router}/>
      </div>
     
    </>
  )
}

export default App
