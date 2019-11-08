import React from "react";
import "../style/Header.css"
import { useDispatch, useSelector } from "react-redux";
import { newGame } from "../store/actions";
import { BoardState, GameState } from "../store/types";
import Timer from "./Timer";

export const Header: React.FC = () => {
    const dispatch = useDispatch();
    const gameState = useSelector((state: BoardState) => state.gameState);

    let image_src;
    switch (gameState) {
        case GameState.playing:
            image_src = "happy_face.png";
            break;
        case GameState.overWin:
            image_src = "glass_face.png"
            break;
        case GameState.overLose:
            image_src = "sad_face.png"
            break;
    }

    return (
        <header>
            <h1>Minesweeper</h1>
            <ul className="cmd-box">
                <li>
                    <p>Time:</p>
                    <Timer />
                </li>
                <li id="restart">
                    <button className="cell" onClick={() => dispatch(newGame())}>
                        <img id="img-button" alt="New game" src={ process.env.PUBLIC_URL + "/img/" + image_src } />
                    </button>
                </li>
                <li>
                    <p>Mines:</p>
                    <p className="score-like">10</p>
                </li>
            </ul>
        </header>
    );
}

export default Header;