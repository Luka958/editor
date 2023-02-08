import * as React from "react";
import {Menu, Sidebar, useProSidebar} from "react-pro-sidebar";
import ProSideMenu from "./ProSideMenu";
import ProMenuItem from "./ProMenuItem";

export default function ProSidebar(props:any) {

  const { collapseSidebar } = useProSidebar();

  return (
    <Sidebar backgroundColor={'#090c15'} style={{borderRight: '1px solid #cbd4d9'}}>

      <Menu>
        <ProSideMenu>
          <ProMenuItem> Pie charts </ProMenuItem>
          <ProMenuItem> Line charts </ProMenuItem>
        </ProSideMenu>
        <ProMenuItem> Documentation </ProMenuItem>
        <ProMenuItem> Calendar </ProMenuItem>
      </Menu>
      <button onClick={() => window.electron.notificationApi.sendNotification({msg: 'message'})}>bBtn</button>
    </Sidebar>
  );
}
