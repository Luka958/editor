import jsIcon from "../static/images/js.png";
import tsIcon from "../static/images/ts.png";
import ktsIcon from "../static/images/kts.png";
import pyIcon from "../static/images/py.png";
import javaIcon from "../static/images/java.png";

import closeDarkIcon from "../static/images/close-dark.png";
import closeLightIcon from "../static/images/close-light.png";
import {useEffect, useState} from "react";
import {File} from '../logic/NPTypes';

interface ITab {
  file: File,
  activePane: File,
  setActivePane: () => void,
  close: () => void,
  modified: boolean
}

export default function Tab(props: ITab) {

  const extension = props.file.name.split('.').pop();
  let icon = '';

  switch (extension) {
    case 'js': {
      icon = jsIcon;
      break;
    }
    case 'ts': {
      icon = tsIcon;
      break;
    }
    case 'kts': {
      icon = ktsIcon;
      break;
    }
    case 'py': {
      icon = pyIcon;
      break;
    }
    case 'java': {
      icon = javaIcon;
      break;
    }
  }

  const [hoverClose, setHoverClose] = useState(false);
  const [hoverTab, setHoverTab] = useState(false);
  const [clickTab, setClickTab] = useState(true);

  useEffect(() => {
    setClickTab(props.file === props.activePane);
  }, [props.activePane]);

  return (
    <span onClick={() => {
      setClickTab(true);
      props.setActivePane();
    }}
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {icon !== '' && <img src={icon.toString()} width="20px" alt="tab-icon"/>}

      <span onMouseEnter={() => setHoverTab(true)}
            onMouseLeave={() => setHoverTab(false)}
            style={{
              backgroundColor: hoverTab ? '#171f35' : '#36477d',
              color: clickTab && '#84ba64',
              fontStyle: clickTab && 'italic',
              display: 'flex',
              alignItems: 'center',
              height: '20px',
              cursor: 'pointer'
            }}
      >
        <span style={{
          paddingLeft: '10px',
          paddingRight: '5px'
        }}>
          { props.file.name }
        </span>
        {props.modified && <span><b>M</b></span>}
        <span
          onMouseEnter={() => setHoverClose(true)}
          onMouseLeave={() => setHoverClose(false)}
          onClick={() => props.close()}
          style={{
          paddingRight: '5px',
          paddingLeft: '5px'
        }}>
          <img src={hoverClose ? closeLightIcon : closeDarkIcon} width="10px" alt="close-icon"/>
        </span>
      </span>
    </span>
  );
}

// icons:
// https://icons8.com/icons/authors/XBiXZyIFty85/tal-revivo/external-tal-revivo-color-tal-revivo/external-logo-color-tal-revivo