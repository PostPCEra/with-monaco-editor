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

/* working set 1.5.5/firepad.min.js -- when tried other higher version number , getting errors. so stick with this version.
    const jslibs = [
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.10.0/codemirror.js",
      "https://www.gstatic.com/firebasejs/7.6.2/firebase.js", 
      "https://firepad.io/releases/1.5.5/firepad.min.js",
      "https://www.firepad.io/examples/firepad-userlist.js"
    ]
*/

    const jslibs = [
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.10.0/codemirror.js",
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

    console.log('LOG 1/x in componentDidMount() : firebase/firepad/codemirror LIBS are loaded .......')

} // end of componentDidMount()

// ------------------------------------------------------------------
initialize_firepad_and_codemirror() {
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

  
  // Create CodeMirror (with line numbers and the JavaScript mode).
  var mycodemirror = CodeMirror(document.getElementById('firepad-container'), {
    lineNumbers: true,
    mode: 'javascript'
  });
 
  console.log('LOG 2/x in  initialize_firepad_and_codemirror():  ......') ;

  // Create Firepad.
  var firepad = Firepad.fromCodeMirror(firepadRef, mycodemirror, {
    defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
  });

  // remove firepad logo from DOM ; getElementsByClassName return a LIST , that is why we need to do [0] 
  document.getElementsByClassName("powered-by-firepad")[0].style.visibility = "hidden" ;
  document.getElementById("start-homework").style.visibility = "hidden" ;   // remove button also as nolonger required ...


}  // end init() ............
  

// Note: timer not working properly, so  have 'Start homework' button and remove buttons as soon as clicked ...
startTimer() {
        setTimeout(() => {
              console.log('Hello, World!');  this.init() ;
        }, 3000);
}

// http://embed.plnkr.co/fMroiV79FvkCJF590dpj/  good one ...  

// --------------------------------
  render() {

    const divStyle = {
      margin: '40px',
      border: '5px solid pink',
      width: '50%',
      height: '500px'
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

    // -----------------------------------------------------------------
    // if you put the code which in the function 'initialize_firepad_and_codemirror' inside 'ComponentDidMount' we are getting errors
    // 'firepad undefined' becasue, they are not fully loaded into DOM. So Time delay is needed to have all the Libarires available. 
    //  That is the reason we are addeding 'start homework' button, this will give time 
    // ------------------------------------------------------------------------

    /// ----------------------------------
    //  in the firepad.css file , following lines are comments as we are getting error with  firepad.eot ....
    /*
      @font-face {
        font-family: 'firepad';
        src:url('firepad.eot');
      } 
   */
    return (
      <>
          <h1>Hello firepad 111... </h1>
          <button id="start-homework" onClick={this.initialize_firepad_and_codemirror}>Start Homework ...</button> 

          {/* this.startTimer() */}

          <div style={divStyle} id="firepad-container"></div>
        
      </>
    );
}


} // end react component