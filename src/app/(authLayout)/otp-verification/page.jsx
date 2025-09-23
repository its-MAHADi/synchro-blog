import Navbar from '@/app/(main)/components/Navbar/Navbar';
import React from 'react';
import OTPForm from './components/OTPForm';

const OtpPage = () => {
    return (
        <div>
            <Navbar />
            <div className='pb-6'>
                <OTPForm />
            </div>
        </div>
    );
};

export default OtpPage;