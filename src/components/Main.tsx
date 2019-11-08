import React from "react";
import Board from "./Board";
import Footer from "./Footer";
import "../style/Main.css";

const Main: React.FC = () => {
  return (
      <main>
        <Board />
        <Footer />
      </main>
  );
}

export default Main;