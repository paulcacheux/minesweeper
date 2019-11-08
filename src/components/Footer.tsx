import React from "react";
import { useSelector } from "react-redux";
import { BoardState, GameState } from "../store/types";
import "../style/Footer.css"

export const Footer: React.FC = () => {
    const gameState = useSelector((state: BoardState) => state.gameState);

    let messages: Array<string>;
    switch (gameState) {
        case GameState.overLose:
            messages = ["game over", "you lost"];
            break;
        case GameState.overWin:
            messages = ["victory"];
            break;
        default:
            return null;
    }

    return (
        <footer>
            <img id="logo" alt="logo" src={process.env.PUBLIC_URL + "/img/logo.png"} />
            <div>
                {messages.map((msg: string, index: number) => <p key={index} className="message">{msg}</p>)}
            </div>
        </footer>
    );
}

export default Footer;