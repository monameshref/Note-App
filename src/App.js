import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import { Offline } from 'react-detect-offline'

export default function App() {

  const queryClient = new QueryClient();

  const myRouter = createBrowserRouter([
    { path: "/", element: <Layout />, children: [
      { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: "Home", element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: "SignUp", element: <SignUp /> },
        { path: "Login", element: <Login />},
      ],
    },
  ]);

  return <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={myRouter} />
      </QueryClientProvider>

      <Offline>
      <div className='text-capitalize bg-black text-white px-3 py-1 rounded position-fixed start-0 bottom-0'>
        your internet connection has been corrupted...
      </div>
    </Offline>
    </>
}
