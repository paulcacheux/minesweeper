import React from "react";
import "../style/Header.css"
import { useDispatch, useSelector } from "react-redux";
import { newGame } from "../store/actions";
import { GameState } from "../store/types";
import Timer from "./Timer";
import { AppState } from "../store/reducers";

function headerSelector(state: AppState) {
    const board = state.game.board;
    let minesLeft = board.bombCount - board.flagCount();
    return { gameState: state.game.gameState, minesLeft };
}

export const Header: React.FC = (props) => {
    const dispatch = useDispatch();
    const { gameState, minesLeft } = useSelector(headerSelector);

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
                    <button className="cell" title="New Game" onClick={() => dispatch(newGame())}>
                        <img id="img-button" alt="New Game" src={process.env.PUBLIC_URL + "/img/" + image_src} />
                    </button>
                </li>
                <li>
                    <p>Mines:</p>
                    <p className="score-like">{minesLeft}</p>
                </li>
            </ul>
            {props.children}
        </header>
    );
}

export default Header;