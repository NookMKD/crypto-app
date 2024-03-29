import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import DataTable from './components/HomePageTable';
import LogIn from './routes/LogIn';
import SignUp from './routes/SignUp';
import { useState } from 'react';
import Root from './routes/root';
import PublicPage from './routes/HomePage';
import AssetPlatforms from './components/AssetPlatforms';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import MyWallet from './components/MyWallet';
import CryptocurrenciesCards from './components/Cryptocurrencies';
import HomePage from './routes/HomePage';
import ProtectedRoutes from './routes/ProtectedRoutes';




let router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
    errorElement: <ErrorPage />
  },
  {
    path: "signup",
    element: <SignUp />,
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    element: <LogIn />,
    errorElement: <ErrorPage />
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "data-table",
        element: <DataTable />,
        errorElement: <ErrorPage />
      }, {
        path: "home-page",
        element: <HomePage />,
        errorElement: <ErrorPage />

      },
      {
        path: "my-wallet",
        element: <MyWallet />,
        errorElement: <ErrorPage />

      },
      {
        path: "asset-platforms",
        element: <AssetPlatforms />,
        errorElement: <ErrorPage />
      },
      {
        path: "crypto-currencies",
        element: <CryptocurrenciesCards />,
        errorElement: <ErrorPage />
      },]
  }
]);

export default function App() {
  let [logedIn, setLogedIn] = useState("isLogedIn")

  function routUser() {
    setLogedIn = localStorage.getItem("isLogedIn");
    if (logedIn) {
      window.location.href = 'home-page'
    } else {
      window.location.href = 'login'
    }
  }

  return (
    <Container maxWidth="100%" sx={{}}>
      <Box >
        <RouterProvider router={router} />
      </Box>
    </Container >
  );
}
