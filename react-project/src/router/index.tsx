import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import Home from '@/pages/Home';
import { NotFound } from '@/components/demo/NotFound';
import { Products } from '@/pages/Products';
import { Dashboard } from '@/pages/Dashboard';


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/products/*" element={<Products />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;