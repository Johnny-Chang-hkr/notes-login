import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
// Added Navigate to the import list
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/Theme/ThemeContext'
import './App.css'

const routes = (
  <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App