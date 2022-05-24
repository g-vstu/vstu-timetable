import { Link } from "react-router-dom";

import "./styled.css";

export default function Navigation() {
    return (
        <section className="header__inner-bottom">
            <div className="container">
                <ul className="navigation">
                    <li className="navigation__item">
                        <Link to="/timetable">Составление расписания</Link>
                    </li>
                    <li className="navigation__item">
                        <Link to="/edittable">Редактирование расписания</Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}
