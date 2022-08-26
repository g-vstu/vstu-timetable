import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import Navigation from "../Navigation";

import userPhoto from "../../assets/images/user-photo.svg";

import "./styled.css";

export default function Header() {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    const Logout = () => {
        localStorage.removeItem("user");
        signOut(() => navigate("/", { replace: true }));
    };

    return (
        <header className="header">
            <div className="header__inner">
                <section className="header__inner-top">
                    <div className="header__inner-top__title">
                        <Link to="/">
                            <h1 className="header__inner-top__title-text">
                                Диспетчерская УО &#171;ВГТУ&#187;
                            </h1>
                        </Link>
                    </div>
                    {user && (
                        <div className="header__inner-top__content">
                            <div className="header__inner-top__content-user">
                                <img
                                    className="top__content-user__img"
                                    src={userPhoto}
                                    alt="user"
                                />
                                <p className="top__content-user__fio">
                                    {user.fio}
                                </p>
                            </div>
                            <input
                                type="submit"
                                className="bth_exit"
                                value="Выйти"
                                onClick={Logout}
                            />
                        </div>
                    )}
                </section>
                {user && <Navigation />}
            </div>
        </header>
    );
}
