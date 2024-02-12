import { toast } from '../../dist'
import './App.css'

function App() {

  const handleClick = () => toast('Hi There, using toaster library!')

  return (
    <>
      <button onClick={handleClick}>Toast</button>
    </>
  )
}

export default App
