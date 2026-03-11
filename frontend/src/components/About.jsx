import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full mt-30 overflow-hidden' id='About'>
       <h1 className=' text-2xl sm:text-4xl font-bold mb-2'>About 
        <span className='underline underline-offset-2 decoration-1 under font-light pl-3'>Our Brand</span></h1>
       <p className='text-gray-500 max-w-80 text-center mb-8'>Passionate About Properties, Dedicated to Your Vision</p>
       <div className='flex flex-col md:flex-row items-center md:items-start md:gap-20'>
         <img src={assets.about_image} className='w-full mt-23 sm:w-1/2 max-w-lg' ></img>
         <div className='flex flex-col items-center md:items-start mt-10 text-gray-600'>
          <div className='grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28'>
             <div>
                <p className='text-5xl font-medium text-gray-800'>12+</p>
                <p>Years of Excellence</p>
             </div>
              <div>
                <p className='text-5xl font-medium text-gray-800'>20+</p>
                <p>Projects Completed</p>
             </div>
              <div>
                <p className='text-5xl font-medium text-gray-800'>25+</p>
                <p>Minimum Sq. Ft. Delivered</p>
             </div>
              <div>
                <p className='text-5xl font-medium text-gray-800'>30+</p>
                <p>Ongoing Projects</p>
             </div>
          </div>
          <p className='mt-6'>
            Discover premium homes designed for comfort, elegance, and modern living. Whether you're buying, selling, or investing, we help you find the perfect property 
            that matches your lifestyle and budget. Explore our curated listings and step into a future where every home feels like a dream come true.
          </p>
         </div>
       </div>
    </div>
  )
}

export default About