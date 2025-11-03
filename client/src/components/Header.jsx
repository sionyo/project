import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'

const Header = ({ showLogout = true }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Project title */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">Project</h1>
          </div>
          
          {/* Right side - Only show if we need logout button */}
          {showLogout && user ? (
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            /* Empty div to maintain flex spacing when no logout button */
            <div></div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header