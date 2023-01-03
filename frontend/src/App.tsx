import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import Router from "./routes/Router";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
