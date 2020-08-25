import App from 'next/app'
import { ThemeProvider } from 'styled-components'


// import "./howler/react_player.css"; // for ./howler app

// for firepad app
// source : https://github.com/FirebaseExtended/firepad/blob/master/examples/code.html
// source : <link rel="stylesheet" href="https://firepad.io/releases/v1.5.9/firepad.css" />
// source : <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/codemirror.css" />
import "./mentor/firepad.css"; 
import "./mentor/codemirror.css"; 


const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
