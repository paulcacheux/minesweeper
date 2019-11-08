import React from "react";
import "../style/Header.css"
import { useDispatch } from "react-redux";
import { newGame } from "../store/actions";

export const Header: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <header>
            <h1>Minesweeper</h1>
            <ul className="cmd-box">
                <li>
                    <p>Time:</p>
                    <p className="score-like">0000</p>
                </li>
                <li id="restart">
                    <button className="cell" onClick={() => dispatch(newGame())}>
                        <img id="img-button" alt="New game" src={ process.env.PUBLIC_URL + "/img/happy_face.png" } />
                    </button>
                </li>
                <li>
                    <p>Score:</p>
                    <p className="score-like">0000</p>
                </li>
            </ul>
        </header>
    );
}

export default Header;