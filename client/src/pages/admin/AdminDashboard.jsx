import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAdminProfile, adminLogout } from '../../store/adminSlice'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { admin } = useSelector((state) => state.admin)

  useEffect(() => {
    if (!admin) {
      dispatch(getAdminProfile()).unwrap().catch(() => {
        navigate('/admin/login')
      })
    }
  }, [admin, dispatch, navigate])

  const handleLogout = () => {
    dispatch(adminLogout())
    navigate('/admin/login')
  }

  if (!admin) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      {/* Admin Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {admin.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Admin Control Panel
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">0</p>
                <p className="text-blue-600 text-sm mt-2">Manage users</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-2">System Status</h3>
                <p className="text-3xl font-bold text-green-600">Online</p>
                <p className="text-green-600 text-sm mt-2">All systems operational</p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Admin Tools</h3>
                <p className="text-3xl font-bold text-purple-600">5+</p>
                <p className="text-purple-600 text-sm mt-2">Available features</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="flex space-x-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200">
                  View Users
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-200">
                  System Settings
                </button>
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition duration-200">
                  Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard