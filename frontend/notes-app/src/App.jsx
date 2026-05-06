import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
// Added Navigate to the import list
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

const routes = (
  <Router>
    <Routes>
      {/* Redirects the root path "/" to "/login" */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      <Route path="/dashboard" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>
  </Router>
);

const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App