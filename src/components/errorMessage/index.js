import React from "react";
import "./styled.css";

export default function ErrorMessage() {
    return (
        <>
            <img
                src={process.env.PUBLIC_URL + "/img/error.png"}
                alt="error"
            ></img>
            <br></br>
            <span>Something goes wrong</span>
        </>
    );
}
