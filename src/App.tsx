import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import NewSalesOrder from './pages/NewSalesOrder/NewSalesOrder';
import CustomerDatabase from './pages/CustomerDatabase';
import CustomerProfile from './pages/CustomerProfile/CustomerProfile';
import ProductCatalog from './pages/ProductCatalog';
import OrderTracking from './pages/OrderTracking/OrderTracking';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import HelpSupportPage from './pages/HelpSupportPage';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = localStorage.getItem('currentUser') !== null;
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute
                element={
                  <>
                    <Navbar />
                    <div className="container mx-auto px-4 py-8">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/new-sales-order" element={<NewSalesOrder />} />
                        <Route path="/customers" element={<CustomerDatabase />} />
                        <Route path="/customers/:id" element={<CustomerProfile />} />
                        <Route path="/product-catalog" element={<ProductCatalog />} />
                        <Route path="/order-tracking" element={<OrderTracking />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/help-support" element={<HelpSupportPage />} />
                      </Routes>
                    </div>
                  </>
                }
              />
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;