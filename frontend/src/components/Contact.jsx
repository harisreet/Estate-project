import React, { useState } from 'react'
import { assets } from '../assets/assets'
import {api} from "../api"
const Contact = () => {
  const [Datas,setDatas]=useState({
    name:"",
    email:"",
    phone:"",
    message:""
  });
  const handleClick=()=>{
    api.post("/contact-admin",Datas)
    .then((res)=>{console.log(res);
      setDatas({name:"",email:"",phone:"",message:""})
      alert("message sent! our team will catch you soon");
    })
    .catch((err)=>console.log(err))
  }
  return (
    <div
      className="relative text-center w-full h-[700px] mt-50 flex flex-col items-center justify-start pt-12 bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${assets.contact_bg}) `
}} id="Contact">

      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-white">
        Contact
        <span className="underline underline-offset-2 decoration-1 font-light pl-3">
          With Us
        </span>
      </h1>
      <p className="text-white max-w-80 text-center mb-8 mx-auto">
        Ready to Make a Move? Let’s Build Your Dream Property Together
      </p>
      <div className='mt-30 flex flex-col gap-4  '>
        <input type="text" placeholder="Your Name" value={Datas.name} onChange={(e)=>setDatas({...Datas,name:e.target.value})}
        className="px-4 py-2 rounded-md bg-white"/>
        <input type="email" placeholder="Your Email" value={Datas.email} onChange={(e)=>setDatas({...Datas,email:e.target.value})}
        className="px-4 py-2 rounded-md bg-white "/>
        <input type="number" placeholder="Your Phone Number" value={Datas.phone} onChange={(e)=>setDatas({...Datas,phone:e.target.value})}
        className="px-4 py-2 rounded-md bg-white"/>
        <textarea placeholder="Type Your Message" value={Datas.message} onChange={(e)=>setDatas({...Datas,message:e.target.value})}
        className="px-4 py-2 rounded-md bg-white"/>
        <button onClick={handleClick} className='px-2 py-2 w-20 m-auto rounded-3xl bg-blue-600 text-white hover:scale-95'>Send</button>
       </div>

    </div>
  )
}

export default Contact
