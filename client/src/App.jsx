import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { getCurrentUser } from './store/authSlice'
import { getAdminProfile } from './store/adminSlice'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import UsersList from './pages/admin/UsersList'

function App() {
  const dispatch = useDispatch()
  const {user, token} = useSelector((state) => state.auth)
  const { admin, adminToken } = useSelector((state) => state.admin)

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser())
    }
  }, [dispatch,token])

  useEffect(() => {
    if (adminToken) {
      dispatch(getAdminProfile())
    }
  }, [dispatch, adminToken])

  return (
    <Router>
      <Routes>
        <Route 
          path = '/'
          element = {
            user ? <HomePage /> : <Navigate to ="/login" />
          }
        />
        <Route 
          path = '/login'
          element = {
            !user ? <LoginPage /> : <Navigate to ="/" />
          }
        />
        <Route 
          path = '/register'
          element = {
            !user ? <RegisterPage /> : <Navigate to ="/" />
          }
        />

        {/* Admin Routes */}
        <Route 
          path="/admin/login" 
          element={!admin ? <AdminLogin /> : <Navigate to="/admin/dashboard" />} 
        />
        <Route 
          path="/admin/dashboard" 
          element={admin ? <AdminDashboard /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="/admin/users" 
          element={admin ? <UsersList /> : <Navigate to="/admin/login" />} 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
export default App