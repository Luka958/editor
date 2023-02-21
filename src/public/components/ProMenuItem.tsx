import * as React from "react";
import {MenuItem} from "react-pro-sidebar";
import {CSSProperties, ReactNode, useState} from "react";
import {getIconFromExtension} from "./Icons";

interface IProMenuItem {
  children: ReactNode,
  extension: string,
  depth: number
}

export default function ProMenuItem(props: IProMenuItem) {

  const icon = getIconFromExtension(props.extension);

  const [hover, setHover] = useState(false);
  const handleHover = (hovered: boolean) => setHover(hovered);

  const style: CSSProperties = {
    color: '#cbd4d9',
    backgroundColor: hover ? '#171f35' : '#090c15',
    height: '2em',
    overflow: 'hidden'
  };

  const LabelComponent = () => {
    const spacing = ' '.repeat(props.depth * 4);

    return (
      <div>
        <span style={{ whiteSpace: 'pre' }}>{spacing}</span>
        <img src={icon} style={{ verticalAlign: 'middle' }} width="14px" alt="menu-item-icon" />
        <span style={{ paddingLeft: '1em' }}>{props.children}</span>
      </div>
    );
  }

  return (
    <MenuItem style={style}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
    >
      <LabelComponent />
    </MenuItem>
  );
}
