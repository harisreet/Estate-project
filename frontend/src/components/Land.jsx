import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Land = () => {
  const navigate = useNavigate();
  const handleclick = () => {
  let token = localStorage.getItem("userToken");

  if (token) {
    navigate("/land_projects");
  } else {
    alert("Please login to view");
  }
};

  return (
    <div
      className='min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden'
      style={{ backgroundImage: `url(${assets.land})` }}
      id='Land'>
      
      <div className='container text-center mx-auto py-4 px-6 md:px-30 lg:px-32 text-white'>
        <h2 className='text-5xl sm:text-6xl md:text-[82]px inline-block max-w-3xl font-semibold pt-20'>Explore Land that fit your dreams</h2>
        <div className="mt-16 flex gap-7 justify-center sm:items-center">
        <button onClick={handleclick} className='inline-block border border-white px-8 py-3 rounded-2xl transform transition duration-100 ease-in-out 
             hover:scale-110'>Land</button>
        <a href="#Contact" className='inline-block border border-white px-8 py-3 rounded-2xl bg-blue-500 transform transition duration-100 ease-in-out 
             hover:scale-110'>Contact Us</a>
        </div>
      </div>
    </div>
  )
}

export default Land
