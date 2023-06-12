import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BoardsProvider } from '../src/context/BoardsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BoardsProvider>
      <App />
    </BoardsProvider>
  </React.StrictMode>,
)
