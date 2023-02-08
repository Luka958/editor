import ReactDOM from "react-dom/client";
import TextBox from "./TextBox";
import {ProSidebarProvider} from "react-pro-sidebar";
import ProSidebar from "./ProSidebar";

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <ProSidebarProvider>
    <div style={{ display: 'flex' }}>
      <ProSidebar />
      <main>
        {/*<StatusBar />*/}
        <TextBox />
      </main>
    </div>
  </ProSidebarProvider>
);
