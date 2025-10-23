import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';

const MainLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
           
            
            <div className=''>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;