import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { getCurrentUser } from './store/authSlice'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  const dispatch = useDispatch()
  const {user, token} = useSelector((state) => state.auth)

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser())
    }
  }, [dispatch,token])

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
      </Routes>
    </Router>
  )
}
export default App