import React from "react";
import { useSelector } from "react-redux";
import { BoardState, GameState } from "../store/types";
import "../style/Footer.css"

export const Footer: React.FC = () => {
    const gameState = useSelector((state: BoardState) => state.gameState);

    let message = undefined;
    switch (gameState) {
        case GameState.overLose:
            message = "game over: you lost"
            break;
        case GameState.overWin:
            message = "victory"
            break;
    }

    return (
        <footer>
            { message && <p id="message">{message}</p>}
        </footer>
    );
}

export default Footer;