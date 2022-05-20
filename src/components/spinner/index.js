import React from "react";
import "./styled.css";

export default function Spinner() {
    return (
        <div className="spinner">
            <h2>Дождитесь окончания загрузки</h2>
            <div className="lds-dual-ring"></div>
        </div>
    );
}
