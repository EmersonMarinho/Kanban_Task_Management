import Header from "./components/Header"
import Center from './components/Center'
import { useState } from "react";

function App() {

  const [boardModalOpen, setBoardModalOpen] = useState(false);


  return (
    <>
    <Header boardModalOpen = {boardModalOpen} setBoardModalOpen = {setBoardModalOpen} />
    <Center/>
    </>
  )
}

export default App