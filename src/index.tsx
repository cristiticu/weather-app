import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Main from './Main'

const router = createBrowserRouter([
    {
        path: '/weather',
        element: <Main />,
    },
    {
        path: '*',
        element: <Navigate to='/weather' />
    },
]);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <RouterProvider router={router} />
);
