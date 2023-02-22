import ReactDOM from "react-dom/client";
import {ProSidebarProvider} from "react-pro-sidebar";
import ProSidebar from "./ProSidebar";
import TabbedPane from "./TabbedPane";
import FileContextProvider from "../logic/contexts/FileContext";

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <ProSidebarProvider>
    <FileContextProvider>
      <div className="flex-only"
           style={{ width: '100%' }}
      >
        <ProSidebar />
        <main style={{ width: '100%' }}>
          {/*<StatusBar />*/}

          <TabbedPane />
        </main>
      </div>
    </FileContextProvider>
  </ProSidebarProvider>
);