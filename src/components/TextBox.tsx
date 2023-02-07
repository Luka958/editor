import * as React from "react";

export default class TextBox extends React.Component {



  render() {
    return (
      <>
        <textarea spellCheck={false} style={{
          width: '100%',
          height: '100%',
          resize: 'none',
          border: '1px solid red',
          outline: 'none',
          fontFamily: 'Consolas'
        }}>

        </textarea>
      </>
    );
  }
}