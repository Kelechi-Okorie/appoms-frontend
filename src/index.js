import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Mantine
import { createTheme, MantineProvider } from '@mantine/core';
// core styles are required for all packages
import '@mantine/core/styles.css';

// import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';


// Routes
import { Root } from './routes/root';
import ErrorPage from './error-page';
import Users from './routes/dashboard/users';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {path: "users", element: <Users />}
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider>
    <ChakraProvider>
      <React.StrictMode>
        {/* <App /> */}
        <RouterProvider router={router} />
      </React.StrictMode>
    </ChakraProvider>
  </MantineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
