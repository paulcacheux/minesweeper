import React from "react";
import Board from "./Board";
import Config from "./Config";
import Footer from "./Footer";
import "../style/Main.css";

const Main: React.FC = () => {
  return (
    <main>
      <Config />
      <Board />
      <Footer />
    </main>
  );
}

export default Main;