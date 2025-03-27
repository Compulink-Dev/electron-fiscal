import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Button } from '../components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    window.electron.subscribeStatistics((stats) => console.log(stats))
  },[])

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Electron</h1>
      <div className="card">
        <Button className='bg-green-600 text-white' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
