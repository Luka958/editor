import * as React from "react";

export default function TextBox() {

  return (
    <>
      <textarea spellCheck={false} style={{
        width: '100%',
        height: 'calc(100vh - 3px)',
        flex: '1',
        resize: 'none',
        border: '1px solid red',
        outline: 'none',
        fontFamily: 'Consolas'
      }}
      placeholder="some text"
      className='colors'
    >

      </textarea>
    </>
  );
}