import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUsers, deleteUser, getAdminProfile } from '../../store/adminSlice'

const UsersList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { admin, users, userCount, isLoading } = useSelector((state) => state.admin)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  useEffect(() => {
    if (!admin) {
      dispatch(getAdminProfile()).unwrap().catch(() => {
        navigate('/admin/login')
      })
    }
    dispatch(getUsers())
  }, [admin, dispatch, navigate])

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
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
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Total: {userCount} users</span>
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Users List */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="text-gray-600">Loading users...</div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Registered Users ({userCount})
                  </h2>
                </div>

                {users && users.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Joined
                          </th>
                          <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {user._id}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {formatDate(user.createdAt)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="text-red-600 hover:text-red-900 ml-4"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-600">No users found.</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersList