import React from "react";
import { useSelector } from "react-redux";
import { GameState } from "../store/types";
import "../style/Footer.css"
import { AppState } from "../store/reducers";

export const Footer: React.FC = () => {
    const gameState = useSelector((state: AppState) => state.game.gameState);

    let messages: Array<string>;
    let logoUrl: string;
    switch (gameState) {
        case GameState.overLose:
            messages = ["game over", "you lost"];
            logoUrl = "logo_loose.png";
            break;
        case GameState.overWin:
            messages = ["victory"];
            logoUrl = "logo.png";
            break;
        default:
            return null;
    }

    return (
        <footer>
            <img id="logo" alt="logo" src={process.env.PUBLIC_URL + "/img/" + logoUrl} />
            <div>
                {messages.map((msg: string, index: number) => <p key={index} className="message">{msg}</p>)}
            </div>
        </footer>
    );
}

export default Footer;