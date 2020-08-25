import React, { Component } from 'react';

//import AceEditor from "react-ace";
//import "ace-builds/src-noconflict/mode-java";
//import "ace-builds/src-noconflict/theme-github";

// https://github.com/FirebaseExtended/firepad/blob/master/examples/code.html

var j = 33333 ;
//var bb = AceEditor ;
// codemi = codeMirror ;

export default class App extends Component {

  // this.libcnt = 0 ;

  
  constructor(props) {
    super(props);
    
    /* count: 0,
      code : 'fun add(a,b) {  int i = 9; }',
      cnt : 222
    */
    this.state = {
      code : this.props.code,  
      cnt : this.props.cnt,
      count : this.props.count

      
    };

    this.aceEditorRef = React.createRef();

  }

  // ------------------------------------------------------------------
  componentDidMount() {

/* working set 1.5.5  with code mirror
    const jslibs = [
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.10.0/codemirror.js",
      "https://www.gstatic.com/firebasejs/7.6.2/firebase.js", 
      "https://firepad.io/releases/1.5.5/firepad.min.js",
      "https://www.firepad.io/examples/firepad-userlist.js"
    ]
*/


    const jslibs = [
        "https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ace.js",
        "https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/mode-javascript.js",
        "https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/theme-textmate.js",
        
      "https://www.gstatic.com/firebasejs/7.6.2/firebase.js", 
      "https://firepad.io/releases/1.5.5/firepad.min.js",
      "https://www.firepad.io/examples/firepad-userlist.js"
    ]

    jslibs.map( lib => {
        const script = document.createElement("script");
        script.async = true;
        script.src = lib;
      
        document.head.appendChild(script); //For head
        //document.body.appendChild(script); // For body

        //alert(lib);
      }
    )  

    console.log('firebase/firepad/codemirror LIBS are loaded .......')

} // end of componentDidMount()

// ------------------------------------------------------------------
init() {
  //// Initialize Firebase.
  
  var config = {
    apiKey: '<API_KEY>',
    authDomain: "firepad-tests.firebaseapp.com",
    databaseURL: "https://firepad-tests.firebaseio.com"
  };
  firebase.initializeApp(config);

  var ref = firebase.database().ref();
  var hash = window.location.hash.replace(/#/g, '');
  if (hash) {
    ref = ref.child(hash);
  } else {
    ref = ref.push(); //   generate unique location.
    window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
  }
  if (typeof console !== 'undefined') {
    console.log('Firebase data: ', ref.toString());
  }
  var firepadRef = ref;

  
  //// Create ACE
  var editor = ace.edit("firepad-container");
  editor.setTheme("ace/theme/textmate");
  var session = editor.getSession();
  session.setUseWrapMode(true);
  session.setUseWorker(false);
  session.setMode("ace/mode/javascript");

  //// Create Firepad.
  var firepad = Firepad.fromACE(firepadRef, editor, {
    defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
  });

}  // end init() ............
  

// http://embed.plnkr.co/fMroiV79FvkCJF590dpj/  good one ...  

// --------------------------------
  render() {

    const divStyle = {
      margin: '40px',
      border: '5px solid pink',
      width: '50%',
      height: '50%'
    };
  

    const ace = () => {
      <AceEditor
      mode="java"
      theme="github"
      ref={this.aceEditorRef}
    
      name="mydiv"
      defaultValue='{this.state.code}'
      editorProps={{ $blockScrolling: true }}
      setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true
      }}
     />
    }


    //   <div style={divStyle} id="firepad-container" className="App">  </div>
    //   <div id="firepad-container" className="App">  </div>


    return (
      <>
          <h1>Hello firepad 111... </h1>
          <button onClick={this.init}>get ace  ...</button> 

          <div  id="firepad-container"></div>
        
      </>
    );
}


} // end react component