import * as React from "react";
import {SubMenu} from "react-pro-sidebar";
import {ReactNode, useState} from "react";
import Icons from "./Icons";

interface IProSideMenu {
  children: string | ReactNode,
  label: string | React.ReactNode,
  depth: number
}

export default function ProSideMenu(props: IProSideMenu) {

  const [hover, setHover] = useState(false);
  const handleHover = (hovered: boolean) => setHover(hovered);

  const LabelComponent = () => {
    const spacing = ' '.repeat(props.depth * 4);

    return (
      <div>
        <span style={{ whiteSpace: 'pre' }}>{spacing}</span>
        <img src={Icons.dirIconSrc} style={{ verticalAlign: 'middle' }} width="16px" alt="tab-icon" />
        <span style={{ paddingLeft: '1em' }}>{props.label}</span>
      </div>
    );
  }

  return (
    <SubMenu label={<LabelComponent />}
             style={{
               color: '#cbd4d9',
               backgroundColor: hover ? '#171f35' : '#090c15',
               height: '2em',
               overflow: 'hidden'
             }}
             onMouseEnter={() => handleHover(true)}
             onMouseLeave={() => handleHover(false)}>
      {props.children}
    </SubMenu>
  );
}
