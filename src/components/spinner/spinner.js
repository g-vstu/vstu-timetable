import React from 'react';
import './spinner.css';

const Spinner = () => {
    return (
        <div className="spinner">
            <h2>Дождитесь окончания загрузки</h2>
            <div className="lds-dual-ring"></div>
        </div>
    );
};

export default Spinner;
