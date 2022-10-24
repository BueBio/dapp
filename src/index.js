import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import Home from './pages/home';
import ClaimCoupon from './pages/claim-coupon';
import Marketplace from './pages/marketplace';
import Profile from './pages/profile';
import TokenDetails from './pages/token-details';
import { ContextProviderRLogin } from './context';
import PublishToken from './pages/publish-token';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ContextProviderRLogin>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/claim-coupon" element={<ClaimCoupon />} />
          <Route exact path="/r/:coupon" element={<ClaimCoupon />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/tokens" element={<Marketplace />} />
          <Route exact path="/publish/:id" element={<PublishToken />} />
          <Route exact path="/token-detail/:id" element={<TokenDetails />} />
        </Routes>
      </BrowserRouter>
    </ContextProviderRLogin>
  </React.StrictMode>,
);
