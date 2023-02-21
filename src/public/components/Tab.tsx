import {useEffect, useState} from "react";
import {File} from '../logic/NPTypes';
import Icons, {getIconFromExtension} from "./Icons";

interface ITab {
  file: File,
  activePane: File,
  setActivePane: () => void,
  close: () => void,
  modified: boolean
}

export default function Tab(props: ITab) {

  const extension = props.file.name.split('.').pop();
  const icon = getIconFromExtension(extension);

  const [hoverClose, setHoverClose] = useState(false);
  const [hoverTab, setHoverTab] = useState(false);
  const [clickTab, setClickTab] = useState(true);

  function handleClick() {
    setClickTab(true);

    if (props.activePane !== props.file) {
      // pane changed (oldPane !== newPane)

    }
    props.setActivePane();
  }

  useEffect(() => {
    setClickTab(props.file === props.activePane);
  }, [props.activePane]);

  return (
    <span onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {icon !== '' && <img src={icon} width="20px" alt="tab-icon"/>}

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
          <img src={hoverClose ? Icons.closeLightIconSrc : Icons.closeDarkIconSrc}
               width="10px"
               alt="close-icon"
          />
        </span>
      </span>
    </span>
  );
}

// icons:
// https://icons8.com/icons/authors/XBiXZyIFty85/tal-revivo/external-tal-revivo-color-tal-revivo/external-logo-color-tal-revivo