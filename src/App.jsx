import { createBrowserRouter } from "react-router";
import "./App.css";

import StartLanding from "./pages/StartLanding/StartLanding";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Applayout from "./Ui/Applayout/Applayout";
import Statistics from "./pages/Statistics/Statistics";
import Tests from "./pages/Tests/Tests";
import Settings from "./pages/Settings/Settings";
import Ranking from "./pages/Ranking/Ranking";
import Subscription from "./pages/Subscription/Subscription";


const router = createBrowserRouter([
  { path: "/", element: <StartLanding /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
{path:"",element:<Applayout/>,children:[
  { path: "/home", element: <Home /> },
  { path: "/statistics", element: <Statistics /> },
  { path: "/tests", element: <Tests /> },
  { path: "/ranking", element: <Ranking /> },
  { path: "/subscriptions", element: <Subscription /> }, 
  { path: "/settings", element: <Settings /> }, 

]}

  

  
]);




function App() {
  return (

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  );
}

export default App;
