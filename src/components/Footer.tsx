import React from "react";
import { useSelector } from "react-redux";
import { BoardState } from "../store/types";

export const Footer: React.FC = () => {
    const message = useSelector((state: BoardState) => state.message);

    return (
        <footer>
            { message && <p>{message}</p>}
        </footer>
    );
}

export default Footer;