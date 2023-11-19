import { createBrowserRouter } from 'react-router-dom';

import Page from './pages/Page';
import Home from './pages/Home';
import Notfound from './pages/Notfound';
import Cursos from './pages/Cursos';
import Alunos from './pages/Alunos';

const Router = createBrowserRouter([

    {
        path: '/',
        element: <Page />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/cursos',
                element: <Cursos />
            },
            {
                path: '/alunos',
                element: <Alunos />
            },
            {
                path: '*',
                element: <Notfound />
            }
        ],

    }
]);

export default Router;