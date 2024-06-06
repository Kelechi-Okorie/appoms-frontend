import React, { useState } from 'react';
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

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Routes
import { Root } from './routes/root';
import ErrorPage from './error-page';
import Users from './routes/dashboard/users';
import Index from './routes/index';
import SignIn from './routes/signin';
import SignUp from './routes/signup';
import {UserRoot} from './routes/userRoot';
import Profile from './routes/profile';
import Account from './routes/account';
import UserDetails from './routes/userDetails';
import Categories from './routes/dashboard/categories';
import Services from './routes/dashboard/services';
import CategoryDetails from './routes/dashboard/categoryDetails';
import NewCategory from './routes/dashboard/newCategory';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import profile from './routes/profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/signin", 
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {path: "users", element: <Users /> },
      {path: "categories", element: <Categories />},
      {path: "new-category", element: <NewCategory />},
      {path: "category-details/:id", element: <CategoryDetails />},
      {path: "services", element: <Services />},    
    ]
  },
  {
    path: "/user",
    element: <UserRoot />,
    children: [
      {path: "profile", element: <Profile />},
      {path: "account", element: <Account />}
    ]
  },
  {path: "/user-details/:id", element: <UserDetails />},
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
      }}
    >
      <ChakraProvider>
        <React.StrictMode>
          {/* <App /> */}
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={true} />
        </React.StrictMode>
      </ChakraProvider>
    </MantineProvider>
  </QueryClientProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
