import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FlowEditor from './components/FlowEditor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: 24 }}>
      <h2>低代码流程编程平台（LogicFlow Demo）</h2>
      <FlowEditor />
    </div>
  )
}

export default App
