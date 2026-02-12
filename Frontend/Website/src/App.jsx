import { Routes, Route, Navigate } from 'react-router-dom'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  )
}

export default App
