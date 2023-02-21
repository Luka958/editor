import * as React from "react";
import {Menu, Sidebar, useProSidebar} from "react-pro-sidebar";
import ProSideMenu from "./ProSideMenu";
import ProMenuItem from "./ProMenuItem";
import {useState} from "react";

export default function ProSidebar(props:any) {

  const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(true);

  function handleCollapse() {
    setCollapsed(collapsed => !collapsed);
    collapseSidebar(collapsed);
  }

  return (
    <Sidebar backgroundColor={'#090c15'}
             style={{
               borderRight: '1px solid #cbd4d9',
               height: '100vh',
               flex: '1',
               position: 'sticky',
               // stick the Sidebar to the top
               top: 0
             }}
    >

      <Menu>
        <ProSideMenu>
          <ProMenuItem> Pie charts </ProMenuItem>
          <ProMenuItem> Line charts </ProMenuItem>
        </ProSideMenu>
        <ProMenuItem> Documentation </ProMenuItem>
        <ProMenuItem> Calendar </ProMenuItem>
      </Menu>
      <button onClick={() => window.electron.notificationApi.sendNotification({msg: 'message'})}>bBtn</button>
      <button onClick={handleCollapse}>collapse</button>
    </Sidebar>
  );
}
