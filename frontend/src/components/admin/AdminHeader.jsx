import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");     
    delete axios.defaults.headers.common["Authorization"]; 
    navigate("/admin");   
  };
  return (
    <div className='fixed w-full flex flex-row justify-center backdrop-blur-md bg-gray-400 text-white p-8 gap-5'>
        <Link to="/admin/add-house" className='hover:scale-110'>Add-Project</Link>
        <Link to="/admin/list-house" className='hover:scale-110'>List-Project</Link>
        <Link to="/admin/list-land" className='hover:scale-110'>List-Land</Link>
        <Link to="/admin/add-land" className='hover:scale-110'>Add-Land</Link>
        <Link to="/admin/list-rental" className='hover:scale-110'>List-Rental</Link>
        <Link to="/admin/add-rental" className='hover:scale-110'>Add-Rental</Link>
        <button onClick={handleLogout} className="rounded-lg hover:scale-110">
        Logout</button>
    </div>
  )
}

export default AdminHeader