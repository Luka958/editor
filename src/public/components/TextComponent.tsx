import * as React from "react";
import {CSSProperties, useEffect, useRef, useState} from "react";

const LINE_HEIGHT = '1.25';

interface ITextComponent {
  content: string,
  setContent: (content: string) => void,
  setModified: (modified: boolean) => void
}

export default function TextComponent(props: ITextComponent) {

  function getRowCount(text: string): number {
    return text.split('\n').length;
  }

  function getItems(rows: number) {
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

  const textareaRef = useRef(null);
  const [rows, setRows] = useState(getRowCount(props.content));
  const [items, setItems] = useState(getItems(rows));
  const [content, setContent] = useState(props.content.replace('\r', ''));
  const [savedContent, setSavedContent] = useState(content);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const textarea = textareaRef.current;

    const handleTextareaChange = (e: { key: string; preventDefault: () => void; }) => {
      if (e.key == 'Tab') {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);

        // put caret at right position again
        // textarea.selectionStart = textarea.selectionEnd = start + 1;
        textarea.setSelectionRange(start + 1, start + 1)
      }
    };

    textarea.addEventListener('keydown', handleTextareaChange);

    return () => {
      textarea.removeEventListener('keydown', handleTextareaChange);
      props.setContent(textarea.value);
    };
  }, []);

  return (
    <div className="flex-only" style={{overflow: 'hidden'}}>
      <span className="flex-direction-column">
        {items}
      </span>
      <textarea className='colors'
                ref={textareaRef}
                defaultValue={props.content}
                spellCheck={false}
                onChange={e => {
                  const lines = e.target.value.split('\n').length;
                  setRows(lines);
                  setItems(getItems(lines));

                  const index = e.target.selectionStart;
                  const textBeforeSelection = e.target.value.slice(0, index);
                  const line = (textBeforeSelection.match(/\n/g) || []).length + 1;
                  setCurrentLine(line);

                  // regex to match the cluster of the same characters at the end of the string
                  const regex = /(\s)\1*$/;
                  const match = regex.exec(e.target.value);

                  if (match !== null && match[0].length === 1) {
                    setSavedContent(e.target.value);
                  }
                  setContent(e.target.value);
                  props.setModified(e.target.value !== savedContent);
                }}
                style={{
                  width: '100%',
                  height: 'auto',
                  flex: '1',
                  resize: 'none',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Consolas',
                  lineHeight: LINE_HEIGHT,
                  whiteSpace: 'nowrap',
                  margin: 0,
                  padding: 0,
                  overflow: 'hidden'
                }}
      ></textarea>
    </div>
  );
}