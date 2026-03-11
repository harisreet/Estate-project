import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
const Testimonails = () => {
  return (
    <div className='container mx-auto py-10 lg:px-32 w-full overflow-hidden' id='Testimonails'>
        <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Customer
        <span className="underline underline-offset-2 decoration-1 font-light pl-3">
        Testimonials
        </span>
      </h1>

      <p className="text-gray-500 max-w-80 text-center mb-8 mx-auto">
        Real Stories from Those Who Found Home with Us
      </p>
      <div className='flex flex-wrap justify-center gap-8'> 
      {testimonialsData.map((testi,index)=>(
         <div key={index} className='max-w-[340px] shadow-md rounded px-8 py-12 text-center'> 
          <img className='w-20 h-20 rounded-full mx-auto mb-4' src={testi.image}></img>
          <h2 className='text-xl text-gray-700 font-medium'>{testi.name}</h2>
          <p className='text-gray-500 text-sm'>{testi.title}</p>
          <div className='flex justify-center gap-1 mt-5 mb-4'>
            {Array.from({length:testi.rating},(item,index)=>(
                <img key={index} src={assets.star_icon}></img>
            ))}
            </div>
            <p className='text-gray-600'>{testi.text}</p>
         </div>
      ))}
      </div>
    </div>
  )
}

export default Testimonails