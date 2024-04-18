import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import Prueba from "./components/prueba.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
  },{
    path:`/home/:name`,
    element:<Home/>
  },{
    path:`/prueba`,
    element:<Prueba/>
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
);
