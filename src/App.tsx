import { Provider } from "react-redux";
import state from "./state/state";

import "./App.css";
import Navigation from "./navigation";

import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={state}>
      <Navigation />
    </Provider>
  );
}
export default App;
