import ReactDOM from "react-dom/client";
import {ProSidebarProvider} from "react-pro-sidebar";
import ProSidebar from "./ProSidebar";
import TabbedPane from "./TabbedPane";

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <ProSidebarProvider>
    <div className="flex-only"
         style={{ width: '100%' }}
    >
      <ProSidebar />
      <main style={{ width: '100%' }}>
        {/*<StatusBar />*/}

        <TabbedPane />
      </main>
    </div>
  </ProSidebarProvider>
);