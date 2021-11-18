import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header__inner">
            <h1 className="header__inner-title">Диспетчерская ВГТУ</h1>
        </div>
    );
};

export default Header;
