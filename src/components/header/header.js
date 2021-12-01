import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header__inner">
            <Link to="/">
                <h1 className="header__inner-title">Диспетчерская ВГТУ</h1>
            </Link>
            <ul>
                <li>
                    <Link to="/timetable">Составление расписания</Link>
                </li>
                <li>
                    <Link to="/edittable">Редактирование расписания</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;
