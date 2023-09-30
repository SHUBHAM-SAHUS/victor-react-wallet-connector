import { CollectionPage, HomePage, MintingPage } from '../pages';

import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    exact: true,
    element: <HomePage />,
    children: [],
  },

  {
    path: '/mint',
    exact: true,
    element: <MintingPage />,
    children: [],
  },

  {
    path: '/collection',
    exact: true,
    element: <CollectionPage />,
    children: [],
  },
]);
