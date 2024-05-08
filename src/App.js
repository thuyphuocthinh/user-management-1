import "./App.scss";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import AppRoute from "./routes/AppRoute";
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <AppRoute />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
