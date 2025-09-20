"use client";

import React from 'react';

const Button = ({ label, type, onClick , clsName}) => {
    return (
        <button onClick={onClick} type={type} className={clsName}>
            {label}
        </button>
    );
};

export default Button;