import { useState } from 'react'
import { Header } from './components';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div>
        <p>intergalactic-analytics</p>
      </div>
    </>
  )
}

export default App
