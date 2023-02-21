import * as React from "react";
import {Menu, Sidebar, useProSidebar} from "react-pro-sidebar";
import ProSideMenu from "./ProSideMenu";
import ProMenuItem from "./ProMenuItem";
import {useEffect, useState} from "react";
import {Directory} from "../logic/NPTypes";
import Icons from "./Icons";

export default function ProSidebar() {

  const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(true);
  const [root, setRoot] = useState(null);

  function handleCollapse() {
    setCollapsed(collapsed => !collapsed);
    collapseSidebar(collapsed);
  }

  function openDirCallback(dir: Directory) {
    setRoot(dir);
  }

  function getExtension(name: string): string {
    return name.split('.').pop();
  }

  useEffect(() => {
    window.electron.fileApi.openDirectory(openDirCallback);
  }, []);

  const ComponentTree = (props: {root: Directory}) => {

    const renderChildren = (children: (File | Directory)[], depth: number) => {
      if (!children) {
        return null;
      }
      return children.map((child) => {
        const label = ' '.repeat(depth * 2).concat(child.name);

        if ('children' in child) {
          return (
            <ProSideMenu key={child.path} label={label} depth={depth}>
              {'children' in child && renderChildren(child.children, depth + 1)}
            </ProSideMenu>
          );
        }
        return (
          <ProMenuItem key={child.path} extension={getExtension(child.name)} depth={depth}>
            <span style={{ whiteSpace: 'pre' }}>
              {label}
            </span>
          </ProMenuItem>
        );
      });
    };

    return (
      <Menu>
        {props.root.children.map((item) => {
          if ('children' in item) {
            return (
              <ProSideMenu key={item.path} label={item.name} depth={0}>
                {'children' in item && renderChildren(item.children, 1)}
              </ProSideMenu>
            );
          }
          return (
            <ProMenuItem key={item.path} extension={getExtension(item.name)} depth={0}>
              {item.name}
            </ProMenuItem>
          );
        })}
      </Menu>
    );
  };

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
      {root !== null && <ComponentTree root={root} />}

      {/*<button onClick={() => window.electron.notificationApi.sendNotification({msg: 'message'})}>bBtn</button>*/}

      <div onClick={handleCollapse}
              style={{
                position: 'absolute',
                bottom: '1%',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
      >
        <img src={Icons.menuIconSrc} alt="menu-icon" width="15px" />
      </div>
    </Sidebar>
  );
}
