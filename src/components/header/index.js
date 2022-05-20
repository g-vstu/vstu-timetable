import React from "react";
import { Link } from "react-router-dom";

import userPhoto from "../../assets/images/user-photo.svg";
import faqImage from "../../assets/images/faq.svg";
import bellImage from "../../assets/images/bell.svg";
import optionsImage from "../../assets/images/options.svg";

import "./styled.css";

export default function Header() {
    return (
        <header className="header">
            <div className="header__inner">
                <section className="header__inner-top">
                    <div className="header__inner-top__title">
                        <label className="menu__btn">
                            <span></span>
                        </label>
                        <Link to="/">
                            <h1 className="header__inner-top__title-text">
                                Диспетчерская УО &#171;ВГТУ&#187;
                            </h1>
                        </Link>
                    </div>
                    <div className="header__inner-top__content">
                        <div className="header__inner-top__content-user">
                            <img
                                className="top__content-user__img"
                                src={userPhoto}
                                alt="user"
                            />
                            <p className="top__content-user__fio">
                                Абазовская Н.К.
                            </p>
                        </div>
                        <div className="header__inner-top__content-settings">
                            <Link to="/">
                                <img
                                    className="top__content-settings__faq"
                                    src={faqImage}
                                    alt="FAQ"
                                />
                            </Link>
                            <Link to="/">
                                <img
                                    className="top__content-settings__bell"
                                    src={bellImage}
                                    alt="BELL"
                                />
                            </Link>
                            <Link to="/">
                                <img
                                    className="top__content-settings__options"
                                    src={optionsImage}
                                    alt="SETTINGS"
                                />
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="header__inner-bottom">
                    <div className="container">
                        <ul className="navigation">
                            <li className="navigation__item">
                                <Link to="/timetable">
                                    Составление расписания
                                </Link>
                            </li>
                            <li className="navigation__item">
                                <Link to="/edittable">
                                    Редактирование расписания
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </header>
    );
}
