import React from 'react';
import './errorMessage.css';

const ErrorMessage = () => {
    return (
        <>
            <img
                src={process.env.PUBLIC_URL + '/img/error.png'}
                alt="error"
            ></img>
            <br></br>
            <span>Something goes wrong</span>
        </>
    );
};

export default ErrorMessage;
