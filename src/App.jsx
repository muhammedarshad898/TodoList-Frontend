
import './App.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import { Routes, Route } from 'react-router-dom'
function App() {
 
  return (
    <>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/dash' element={<Dashboard />} />
    </Routes>
     
    </>
  )
}

export default App
