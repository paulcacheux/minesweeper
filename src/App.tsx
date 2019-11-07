import React from "react";
import Board from "./components/Board";
import { createStore } from "redux";
import { boardReducer } from "./store/reducers";
import { Provider } from "react-redux";

const store = createStore(boardReducer);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Board />  
    </Provider>
  );
}

export default App;