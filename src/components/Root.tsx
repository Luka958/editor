import ReactDOM from "react-dom/client";
import StatusBar from "./StatusBar";
import TextBox from "./TextBox";

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <div>
    <StatusBar />
    <TextBox />
  </div>
);
