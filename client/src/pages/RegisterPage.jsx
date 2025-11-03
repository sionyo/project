import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { registerUser, clearError } from "../store/authSlice";
import Header from "../components/Header";


const RegisterPage = () => {
    const [ formData, setFormData ] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    })

    const { name, email, password, confirmPassword } = formData

    const dispatch = useDispatch()
    const {isLoading, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(clearError())
    }, [dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if( password !== confirmPassword) {
            alert('passwords do not match')
            return
        }

        dispatch(registerUser({name, email, password}))

    }
    return ( 
        <div className="min-h-screen bg-gradient-to-r from-red-400 via-orange-400 to-pink-400">
          <Header showLogout={false} />
          <div className="flex items-center justify-center py-8">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Create your Account
            </h2>
            {isError && (
                <div  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {message}
                </div>
            )}
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Full name
                    </label>
                    <input 
                        type ="text"
                        name = "name"
                        value = {name}
                        onChange = {onChange}
                        required
                        placeholder = "Enter yout name"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input 
                        type = "email"
                        name = "email"
                        value = {email}
                        onChange={onChange}
                        required
                        placeholder = "enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input 
                        type = "password"
                        name = "password"
                        value = {password}
                        onChange={onChange}
                        required
                        placeholder = "enter your password"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input 
                        type = "password"
                        name = "confirmPassword"
                        value = {confirmPassword}
                        onChange={onChange}
                        required
                        placeholder = "confirm your password"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    type = 'submit'
                    disabled = {isLoading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                >
                    {isLoading ? 'creating account ..' : 'Register'}
                </button>
            </form>
            <p className="text-center text-gray-600 text-sm mt-4">
                Already have an account?{''}
            </p>
            <Link to='/login' className="text-blue-500 hover:text-blue-600">
                Login here
            </Link>
          </div> 
          </div> 
        </div>
     );
}
 
export default RegisterPage;