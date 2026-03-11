import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api';
const ProjectDetails = () => {
    const {id} = useParams();
    const [datas,setDatas] = useState(null);
    const [imageDate,setImageData] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    useEffect(()=>{
        api.get(`/rental/${id}`)
        .then((res)=> setDatas(res.data))
        .catch((err)=> console.log(err));

        api.get(`/image/${id}`)
        .then((res)=> {setImageData(res.data);
            if (res.data.length > 0) {
        setSelectedImage(res.data[0].image_url); 
          }
        })
        .catch((err)=> console.log(err));
    },[id])
  
    if (!datas) {
    return <div className="text-center mt-50 text-lg">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-30" id="projectdetails">
        <div className='flex flex-col justify-center items-center'>
            <h1 className="text-3xl font-bold px-10">{datas.title} <span className='font-normal text-sm'>({datas.type})</span></h1>
            <p className='w-auto items-center m-5 text-gray-500'>{datas.address}</p>
        </div>
        <div className='flex gap-10 '>
            <div>
                <img src={`http://localhost:8000${selectedImage}`} className='object-cover w-full h-100'></img>
            </div>
             <div className='grid grid-cols-2 gap-2'>
           {imageDate.map((p)=> 
           <img onClick={() => setSelectedImage(p.image_url)} src={`http://localhost:8000${p.image_url}`} className="w-48 h-48 object-cover rounded-xl shadow-md"/>
        )}
        </div>
        </div>
        <div className='mt-10'>
                        <p className='text-2xl'>Experience The Luxury Never Before<span className='pl-20'>${datas.rent_amount}/{datas.category === "pg" ?<span className='font-normal text-sm'>per person</span>: <span className='font-normal text-sm'>per family</span> }</span></p>
        </div>
          
        <div className='flex gap-5 mt-5'>
            {datas.amenities.split(',').map((i)=> 
            <span className='bg-gray-100 rounded-2xl shadow-2xl p-2'>{i}</span>
            )}
        </div>
        <div className='mt-5 bg-gray-950 text-white p-2'>
            <p>{datas.furnishing}<span className='pl-2'>|</span><span className='pl-2'>{datas.location}</span></p>
        </div>
    </div>
  );
}

export default ProjectDetails