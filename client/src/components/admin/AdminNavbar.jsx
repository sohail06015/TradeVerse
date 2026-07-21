import { Link } from "react-router-dom"
import { assets } from "../../assets/assets"

const AdminNavbar = () => {

    return (
        <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-200">
            <Link to="/">
                <img className="w-30 h-auto" src={assets.logo1} alt="logo1" />
            </Link>
        </div>
    )
}

export default AdminNavbar