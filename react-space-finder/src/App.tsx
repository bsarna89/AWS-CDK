import './App.css';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBAr';
import { useState } from 'react';
import LogingComp from './components/LoginComp';
import { AuthService } from './services/AuthService';
import { DataService } from './services/DataService';
import CreateSpace from './components/spaces/CreateSpace';
import Spaces from './components/spaces/Spaces';

const authService = new AuthService();
const dataService = new DataService(authService);

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
          element: <CreateSpace dataService={dataService} />
        },
        {
          path: "/spaces",
          element: <Spaces dataService={dataService}/>
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
