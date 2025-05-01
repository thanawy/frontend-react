import { createBrowserRouter } from "react-router";
import "./App.css";

import StartLanding from "./pages/StartLanding/StartLanding";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
  { path: "/", element: <StartLanding /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <Home /> },
  
]);




function App() {
  return (

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  );
}

export default App;
