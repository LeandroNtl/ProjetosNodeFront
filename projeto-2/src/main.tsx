import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './routes';
import GlobalStyle from './styles/global';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={Router} />
  </React.StrictMode>,
)
