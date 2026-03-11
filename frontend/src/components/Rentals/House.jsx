import React,{useState,useEffect} from 'react'
import {api} from '../../api'
import { useNavigate } from 'react-router-dom';
const House = () => {
  const [location,setLocation]=useState("");
  const [sortLowHigh, setSortLowHigh] = useState(false);
  const [sortHighLow, setSortHighLow] = useState(false);
  const [categoryType,setCategoryType]=useState("");
  const [projectsData,setProjectsData]=useState([]);
  const navigate=useNavigate();
   useEffect(() => {
    api
      .get("/rental")
      .then((res) => setProjectsData(res.data))
      .catch((err) => { if (err.response?.status === 401) {
        alert("Please login to view projects");
        localStorage.removeItem("userToken");
        navigate("/");
      }console.log(err);});
  }, []);
  let data=projectsData.filter((p) => p.category==="house")
  let filterProduct=[...data];
  
  if (location.trim() !== "") {
    filterProduct = filterProduct.filter((p) =>
      p.location.toLowerCase().includes(location.toLowerCase()) || p.type.toLowerCase().includes(location)
    );
  }
  if(categoryType){
    filterProduct=filterProduct.filter((p)=>
       p.gender===categoryType
    );
  }
  if (sortLowHigh) {
    filterProduct.sort((a, b) => a.rent_amount - b.rent_amount);
  }

  if (sortHighLow) {
    filterProduct.sort((a, b) => b.rent_amount - a.rent_amount);
  }

  const clearFunction = () =>{
    setLocation("");
    setSortHighLow(false);
    setSortLowHigh(false);
    setCategoryType("");
  }

  return (
    <div className='flex flex-col items-center justify-center mt-20' id="pg">
      <h1 className=' text-2xl sm:text-4xl font-bold mb-2'>House
        <span className='underline underline-offset-2 decoration-1 under font-light pl-3'>From Us</span>
      </h1>
      <p className='text-gray-500 max-w-80 text-center mb-8'>With love</p>
      
      <div className="flex flex-col gap-2 border w-full max-w-lg mx-auto px-5 sm:px-10">
        <div className='border-b-1 flex justify-between p-2'>
         <h1 className='text-xl'>FILTERS</h1>
         <button onClick={clearFunction} className='font-light text-gray-500'>clear</button>
        </div>

        <div className='p-5'>
          <h1 className='font-semibold'>Location</h1>
          <input 
            className='p-1 border rounded' 
            type="search" 
            value={location} 
            onChange={(e)=> setLocation(e.target.value)} 
            placeholder='search location/sharing'
          />
        </div>

        <div className='p-5'>
          <h1 className='font-semibold'>Sort By</h1>

          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={sortLowHigh} 
              onChange={()=>{
                setSortHighLow(false);
                setSortLowHigh(!sortLowHigh);
              }}
            />
            <span>Price Low to High</span>
          </label>

          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={sortHighLow} 
              onChange={()=>{
                setSortLowHigh(false);
                setSortHighLow(!sortHighLow);
              }} 
            />
            <span>Price High to Low</span>
          </label>

        </div>

<div className='p-5'>
  <h1 className='font-semibold'>Category</h1>

  <label className="flex items-center gap-2">
    <input 
      type="checkbox" 
      checked={categoryType === "male"} 
      onChange={() => setCategoryType(categoryType === "male" ? "" : "male")}
    />
    <span>male</span>
  </label>

  <label className="flex items-center gap-2">
    <input 
      type="checkbox" 
      checked={categoryType === "female"} 
      onChange={() => setCategoryType(categoryType === "female" ? "" : "female")}
    />
    <span>female</span>
  </label>
</div>

      </div>

    <div className="mt-10 flex flex-row flex-wrap gap-8 justify-center w-full">
  {filterProduct.length === 0 &&
    (<h1 className="text-xl font-semibold mb-10">No data found</h1>)}

  {filterProduct.map((project, index) => (
    <div key={index}
      className="flex items-center gap-6 p-4 rounded-2xl shadow-xl bg-white/70 backdrop-blur-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-1 hover:scale-104 transition-all duration-300">
      <img src={`http://localhost:8000${project.image_url}`} className="w-48 h-48 object-cover rounded-xl shadow-md"/>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{project.title}</h1>
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-xl font-semibold">{project.type}
          </span>
        </div>
        <span className={`px-3 py-1 w-fit rounded-full text-xs font-semibold ${
            project.gender === "male"? "bg-blue-200 text-blue-700"
              : project.gender === "female"? "bg-pink-200 text-pink-700"
              : "bg-purple-200 text-purple-700"
          }`}>{project.gender}</span>

        <div className="flex items-center gap-2 text-gray-600">
          <h4 className="font-medium">{project.location}</h4>
        </div>

        <p className="text-green-600 font-extrabold text-xl">
          ₹ {project.rent_amount}
          <span className="text-gray-500 font-medium text-sm"> /month</span>
        </p>

        <button onClick={()=> navigate(`/pro/items/${project.id}`)} className="mt-2 bg-black text-white py-2 px-4 rounded-xl hover:bg-gray-900 transition-all">
          View Details
        </button>
      </div>
    </div>
  ))}
</div>

</div>
  )
}
export default House
