import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyRoute from './MyRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <MyRoute/>
     
    </>
  )
}

export default App
