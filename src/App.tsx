import React from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { createStore } from "redux";
import { boardReducer } from "./store/reducers";
import { Provider } from "react-redux";

const store = createStore(boardReducer);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Header />
      <Board />
      <Footer />
    </Provider>
  );
}

export default App;