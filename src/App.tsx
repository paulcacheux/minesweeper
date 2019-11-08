import React from "react";
import Header from "./components/Header";
import { createStore } from "redux";
import { boardReducer } from "./store/reducers";
import { Provider } from "react-redux";
import Main from "./components/Main";

const store = createStore(boardReducer);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Header />
      <Main />
    </Provider>
  );
}

export default App;