import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion";
import { HashLink } from 'react-router-hash-link'

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row bg-gray-800 text-white justify-between px-6 md:px-20 lg:px-32 py-10 gap-10">

      <div className="flex flex-col gap-5 md:w-1/3">
        <img className="w-32" src={assets.logo_dark} alt="logo" />
        <p className="font-light md:w-60">
          Connecting people with the spaces they love. We take pride in supporting communities,
          delivering quality homes, and helping families build lasting memories.
        </p>
      </div>

    
      <div className="flex flex-col gap-5 md:w-1/4">
        <h1 className="font-semibold text-2xl">Company</h1>
        <nav className="flex flex-col gap-1">
          <HashLink smooth to='/#Header' className="font-light">Home</HashLink>
         <HashLink smooth to="/#Projects" className="font-light">Projects</HashLink>
          <HashLink smooth to="/#Testimonails" className="font-light">Testimonails</HashLink>
          <HashLink smooth to="/#About" className="font-light">About</HashLink>
         <HashLink smooth to="/#Contact" className="font-light">Contact Us</HashLink>
        </nav>
      </div>

      
      <div className="flex flex-col gap-5 md:w-1/3">
        <h1 className="font-semibold text-2xl">Subscribe to our newsletter</h1>
        <p className="font-light">The latest news, articles, and resources, sent weekly.</p>

        
        <div className="flex flex-col gap-3">
          <input
            className="border px-4 py-2 rounded w-full"
            type="text"
            placeholder="Your Email"
          />

          <button className="p-5 bg-blue-600 py-2 m-auto rounded hover:scale-95 transition">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
