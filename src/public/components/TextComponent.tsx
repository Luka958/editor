import * as React from "react";

type Props = {
  content: string;
};
type State = {
  count: number;
};

export default class TextComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  state: State = {
    // default state value
    count: 0,
  };

  render() {
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
                className='colors'
                defaultValue={this.props.content}
      >

      </textarea>
      </>
    );
  }
}