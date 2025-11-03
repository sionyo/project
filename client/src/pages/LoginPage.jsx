import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser, clearError} from '../store/authSlice'
import Header from '../components/Header'

const LoginPage = () => {
    
    const [formData, setFormData] = useState({
        email:'',
        password: ''
    })

    const { email, password } = formData
    const dispatch = useDispatch();
    const { isLoading, isError, message } = useSelector((state) => state.auth)

    useEffect(()=>{
        dispatch(clearError())
    }, [dispatch])

    const onChange = (e) => {
        setFormData((prevState) =>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser({email, password}))
    }
    return ( 
        <div className="min-h-screen bg-gradient-to-r from-red-400 via-orange-400 to-pink-400 ">
            <Header showLogout={false} />
            <div className="flex items-center justify-center py-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Login to your account
                </h2>
                {isError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {message}
                    </div>
                )}
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input 
                            type = 'email'
                            name = 'email'
                            value = {email}
                            onChange={onChange}
                            required
                            placeholder = 'enter your email'
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input 
                            type = "password"
                            name = "password"
                            value = {password}
                            onChange = {onChange}
                            required
                            placeholder='enter your password'
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type = 'submit'
                        disabled = {isLoading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {isLoading ? 'Logging in..' : 'login'}
                    </button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-4">
                    Dont have an account?{''}
                    <Link to = '/register' className="text-blue-500 hover:text-blue-600">
                        Register Here
                    </Link>
                </p>
            </div>
            </div>
        </div>
     );
}
 
export default LoginPage;