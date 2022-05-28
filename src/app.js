import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Menu from './components/menu';
import Portfolio from './pages/portfolio';
import Vaults from './pages/vaults';
import Nfts from './pages/nfts';
import { ContextProviderRLogin } from './context';
import './index.scss';

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Portfolio />,
    },
    {
      path: '/vaults',
      element: <Vaults />,
    },
    {
      path: '/nfts',
      element: <Nfts />,
    },
  ]);
  return routes;
}

function AppWrapper() {
  return (
    <ContextProviderRLogin>
      <Router>
        <div className="container">
          <div className="nav">
            <Menu />
          </div>
          <div className="main">
            <App />
          </div>
        </div>
      </Router>
    </ContextProviderRLogin>
  );
}

export default AppWrapper;
