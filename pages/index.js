import dynamic from 'next/dynamic'

import sample from '../code-sample'

/* ------------------- source: this is combination of 3 sources -------------------------------------------------------------
 1/ next.js/examples/with-monaco-editor : we started with this sub repo 
    - this subrepo has 'next.config.js' file which is custom 'webpack' build , also package.json has original 'monoco-editor'

 2/ took ideas from : react-monaco-editor  README.md about  this.editor , this.monaco 
     - https://github.com/react-monaco-editor/react-monaco-editor/blob/master/example/index.js
     - editorDidMount = (editor) => { this.editor = editor };
     -
     - Below text is from thisfile: https://github.com/react-monaco-editor/react-monaco-editor/README.md 
     - How to interact with the MonacoEditor instance: Using the first parameter of editorDidMount(editor)
     - editorDidMount(editor, monaco) an event emitted when the editor has been mounted (similar to componentDidMount of React).


 3/  stack-over flow  : https://stackoverflow.com/questions/41642649/how-do-i-insert-text-into-a-monaco-editor

 ------------------- ****************************************  -------------------------------------------------------------
 */

const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false })

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
      editor: null,
      monaco: null
    },
    this.editor = null;
    this.mon = null ;
  }

  editorDidMount = (editor, monaco) => {
    // eslint-disable-next-line no-console
    console.log("editorDidMount 222", editor, editor.getValue(), editor.getModel());
    this.editor = editor;
    this.mon = monaco ;
  };

  changeEditorValue = () => {
    if (this.editor) {
      this.editor.setValue("// code changed! \n");
    }
  };

  onChange(newValue, e) {
    // console.log('onChange', newValue);
  }

  insertCodeAtCursor = () => {
    // source:  https://stackoverflow.com/questions/41642649/how-do-i-insert-text-into-a-monaco-editor
    var line = this.editor.getPosition();
    var range = new this.mon.Range(line.lineNumber, 1, line.lineNumber, 1);
    var id = { major: 1, minor: 1 };             
    var text = "fun add(a,b) { } ";
    var op = {identifier: id, range: range, text: text, forceMoveMarkers: true};
    this.editor.executeEdits("my-source", [op]);
  }

  // -----------------------------------------------------
  render() {

    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };

    return (
      <>
	   <h3> Monaco with Next js </h3>
      <button onClick={this.changeEditorValue} type="button">Change editor value</button>

      <button onClick={this.insertCodeAtCursor} type="button">insert Code AtCursor</button>
     
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />

      </>
    );

  }  // end render()

}  // end Class component

export default IndexPage