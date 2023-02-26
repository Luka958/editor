import * as React from "react";
import {CSSProperties} from "react";
import {StatusBarInfo} from "../logic/NPTypes";

export default function StatusBar(props: StatusBarInfo){

  const style: CSSProperties = {
    paddingLeft: '0.5em'
  };

  return (
    <div style={{
      backgroundColor: '#36477d',
      width: '100%',
      position: 'fixed',
      bottom: '0',
      zIndex: '10',
      padding: '2px',
      whiteSpace: 'nowrap'
    }}>
      <div style={{ display: 'flex',  }}>
        <span style={{  flexBasis: '100%', paddingLeft: '0.5em' }}>Length: {props.length}</span>

        <span style={{  flexBasis: '100%' }}>
          <span style={style}>Ln: {props.ln}</span>
          <span style={style}>Col: {props.col}</span>
          <span style={style}>Sel: {props.sel}</span>
        </span>
      </div>
    </div>
  );
}