import * as React from "react";
import {CSSProperties, useState} from "react";

const LINE_HEIGHT = '1.25';

export default function TextComponent(props: {content: string}) {

  function getRowCount(text: string): number {
    return text.split('\n').length;
  }

  function getItems() {
    const items = [];
    const style: CSSProperties = {
      lineHeight: LINE_HEIGHT,
      fontFamily: 'Consolas',
      float: 'right',
      whiteSpace: 'pre',
      paddingLeft: '10px',
      paddingRight: '10px'
    };
    const maxCount = getDigitCount(rows);

    for (let i = 1; i <= rows; i++) {
      const content = ' '.repeat(maxCount - getDigitCount(i)) + i.toString();
      items.push(<span key={`row-${i}`} style={style}>{content}</span>);
    }
    return items;
  }

  function getDigitCount(num: number): number {
    return num.toString().length;
  }

  const [rows, setRows] = useState(getRowCount(props.content));
  const [items, setItems] = useState(getItems());

  return (
    <div style={{
      display: 'flex'
    }}>
      <span style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        {items}
      </span>
      <textarea className='colors'
                defaultValue={props.content}
                spellCheck={false}
                onChange={e => {
                  const newRows = getRowCount(e.target.value);
                  const lastChar = e.target.value.charAt(e.target.value.length - 1);
                  if (lastChar === '\n')
                    console.log("newline")
                  setRows(lastChar === '\n' ? newRows + 1 : newRows);
                  setItems(getItems());
                }}
                style={{
                  width: '100%',
                  height: 'calc(100vh - 3px)',
                  flex: '1',
                  resize: 'none',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Consolas',
                  lineHeight: LINE_HEIGHT,
                  whiteSpace: 'nowrap',
                  margin: 0,
                  padding: 0
                }}
      ></textarea>
    </div>
  );
}