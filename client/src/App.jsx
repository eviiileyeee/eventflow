import { useState } from 'react'
import './index.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Navbar/>
    </>
  )
}

export default App
