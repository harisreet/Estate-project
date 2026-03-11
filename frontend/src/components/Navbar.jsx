import React, { useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import Login from './Login'
import {api} from '../api'
import {AdminApi} from '../components/admin/AdminApi'
const Navbar = () => {
    const[showMobileMenu,setShowMobileMenu]=useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [hideLogin,setHideLogin] = useState(false);
    //const [isLogin, setIsLogin] = useState(false);
    useEffect(()=>{
        if(showMobileMenu){
            document.body.style.overflow='hidden';
        }
        else{
            document.body.style.overflow='auto';
        }
        return ()=>{
            document.body.style.overflow='auto';
        }
    },[showMobileMenu])
    useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
        setHideLogin(true);
    } else {
        setHideLogin(false);
    }
    }, []); 

    const logout = () => {
    setHideLogin(false);
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    delete api.defaults.headers.common["Authorization"];
    delete AdminApi.defaults.headers.common["Authorization"];
    window.location.href = "/";
};

  return (
    <div className='fixed top-0 left-0 w-full z-10 ' style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2))"}}>
        <div className='w-full flex justify-between items-center py-4 px-6 md:px-20 lg:px-32'>
            <img src={assets.logo}></img>
            <ul className='hidden md:flex gap-7 text-white'>
                <HashLink smooth to="/#Header"  className='cursor-pointer hover:text-gray-400 transform transition duration-300 hover:scale-110'>Home</HashLink>
                <HashLink smooth to="/#available_projects" className='cursor-pointer hover:text-gray-400 transform transition duration-300 hover:scale-110'>Rentals</HashLink>
                <HashLink smooth to="/#Land" className='cursor-pointer hover:text-gray-400 transform transition duration-300 hover:scale-110'>Land</HashLink>
                <HashLink smooth to="/#Testimonails" className='cursor-pointer hover:text-gray-400 transform transition duration-300 hover:scale-110'>Testimonails</HashLink>
                <HashLink smooth to="/#About" className='cursor-pointer hover:text-gray-400 transform transition duration-300 hover:scale-110'>About</HashLink>
            </ul>
            {hideLogin ? 
            <button onClick={logout} className='hidden md:block bg-white px-8 py-2 rounded-full hover:scale-95'>Logout</button> 
            : <button onClick={()=>{setShowLogin(true);}}className='hidden md:block bg-white px-8 py-2 rounded-full hover:scale-95'>Login</button>}
             
            <img onClick ={()=> setShowMobileMenu(true)} src={assets.menu_icon} className='absolute right-0 mr-5 md:hidden w-7'></img>
            {/*----mobile-menu-----*/}
            <div className={`md:hidden ${showMobileMenu?'fixed w-full': 'h-0 w-0'}  right-0 top-0 bottom-0 overflow-hidden bg-white transistion-all`}>
                <div className='flex justify-end p-6 cursor-pointer'>
                    <img onClick={()=> setShowMobileMenu(false)}src={assets.cross_icon} className='w-6'></img>
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <HashLink smooth to='/#Header' onClick={()=> setShowMobileMenu(false)} className='px-4 py-2 rounded-full inline-block'>Home</HashLink>
                        <HashLink smooth to='/#Projects' onClick={()=> setShowMobileMenu(false)} className='px-4 py-2 rounded-full inline-block'>Projects</HashLink>
                        <HashLink smooth to='/#Testimonails' onClick={()=> setShowMobileMenu(false)} className='px-4 py-2 rounded-full inline-block'>Testimonails</HashLink>
                        <Link to="/properties" onClick={()=> setShowMobileMenu(false)} className='px-4 py-2 rounded-full inline-block'>Properties</Link>
                        <HashLink smooth to='/#About' onClick={()=> setShowMobileMenu(false)} className='px-4 py-2 rounded-full inline-block'>About</HashLink>
                    </ul>
            </div>
        </div>
        <div>
           {showLogin && <Login setShowLogin={setShowLogin} setHideLogin={setHideLogin} />}

        </div>
    </div>
  )
}

export default Navbar