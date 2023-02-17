import React from "react";
import TextComponent from "./TextComponent";
import Tab from "./Tab";

export type File = { path: string, name: string, content: string };
type Props = object;
type State = { panes: File[], activePane: File };

export default class TabbedPane extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  state: State = { panes: new Array<File>(), activePane: null };

  componentDidMount() {
    console.log("adding model")

    window.electron.fileApi.openFile((file: File) => {
      this.setState(prevState => ({
        panes: [...prevState.panes, file],
        activePane: file
      }));
    });
  }

  render() {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {this.state.panes.map(pane =>
            <Tab key={pane.path} file={pane} activePane={this.state.activePane} setActivePane={() => this.state.activePane = pane}/>
          )}
        </div>
        {this.state.activePane !== null &&
          <TextComponent key={this.state.activePane.path} content={this.state.activePane.content}/>}
      </>
    );
  }
}