import React from 'react'
import { ThemeProvider } from 'styled-components'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const blue = '#07c'
const lightgray = '#f6f6ff'
const platinum = '#E5E4E2'

const theme = {
  fontSizes: [
    12, 14, 16, 24, 32, 48, 64
  ],
  colors: {
    blue,
    lightgray,
    platinum,
  },
  buttons: {
    primary: {
      color: '#fff',
      backgroundColor: blue,
    },
    outline: {
      color: blue,
      backgroundColor: 'transparent',
      boxShadow: 'inset 0 0 2px'
    },
  },
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
