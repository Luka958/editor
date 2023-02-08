import * as React from "react";
import {Menu, MenuItem, Sidebar, SubMenu, useProSidebar} from "react-pro-sidebar";
import {ReactNode, useState} from "react";

export default function ProMenuItem(props: any) {

  const [hover, setHover] = useState(false);
  const handleHover = (hovered: boolean) => setHover(hovered);

  return (
    <MenuItem
             style={{
               color: '#cbd4d9',
               backgroundColor: hover ? '#171f35' : '#090c15'
             }}
             onMouseEnter={() => handleHover(true)}
             onMouseLeave={() => handleHover(false)}>
      {props.children}
    </MenuItem>
  );
}
