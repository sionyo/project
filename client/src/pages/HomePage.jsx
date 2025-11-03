import { useDispatch, useSelector } from "react-redux";
import {logout} from '../store/authSlice' 
import Header from "../components/Header";

const HomePage = () => {
    const { user } = useSelector((state) => state.auth)

    return ( 
        <div className="min-h-screen bg-gradient-to-r from-red-400 via-orange-400 to-pink-400">
            <Header showLogout = {true} />
            <div className="flex items-center justify-center py-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    Welcome to the Project
                </h1>
                <p className="text-gray-600 mb-2 text-center">
                    Hello, <strong>{user?.name}</strong>!
                </p>
                <p className="text-gray-500 text-center mb-6">
                    you are Successfully logged in
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-center">
                    This is your protected home page. Only authenticated users can see this content.
                  </p>
                </div>
            </div>
            </div>
        </div>
     );
}
 
export default HomePage;