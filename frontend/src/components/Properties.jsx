import React,{useState,useEffect} from 'react'
import {api} from '../api'
import { useNavigate } from 'react-router-dom';
const Properties = () => {
  const [location,setLocation]=useState("");
  const [sortLowHigh, setSortLowHigh] = useState(false);
  const [sortHighLow, setSortHighLow] = useState(false);
  const [categoryType,setCategoryType]=useState("");
  const [projectsData,setProjectsData]=useState([]);
  const navigate=useNavigate();
   useEffect(() => {
    api
      .get("/projects")
      .then((res) => setProjectsData(res.data))
      .catch((err) => { if (err.response?.status === 401) {
        alert("Please login to view projects");
        localStorage.removeItem("userToken");
        navigate("/");
      }console.log(err);});
  }, []);
  let filterProduct=[...projectsData];
  
  if (location.trim() !== "") {
    filterProduct = filterProduct.filter((p) =>
      p.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  const toNumber = (price) => {
    if (typeof price === "number") return price
    const cleaned = String(price).replace(/[^0-9.]/g, "")
    return cleaned === "" ? 0 : parseFloat(cleaned)
  }
  if(categoryType){
    filterProduct=filterProduct.filter((p)=>
       p.category===categoryType
    );
  }
  if (sortLowHigh) {
    filterProduct.sort((a, b) => toNumber(a.price) - toNumber(b.price));
  }

  if (sortHighLow) {
    filterProduct.sort((a, b) => toNumber(b.price) - toNumber(a.price));
  }

  const clearFunction = () =>{
    setLocation("");
    setSortHighLow(false);
    setSortLowHigh(false);
    setCategoryType("");
  }

  return (
    <div className='flex flex-col items-center justify-center mt-20' id="properties">
      <h1 className=' text-2xl sm:text-4xl font-bold mb-2'>Properties 
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
            placeholder='search location'
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
      checked={categoryType === "Villa"} 
      onChange={() => setCategoryType(categoryType === "Villa" ? "" : "Villa")}
    />
    <span>Villa</span>
  </label>

  <label className="flex items-center gap-2">
    <input 
      type="checkbox" 
      checked={categoryType === "House"} 
      onChange={() => setCategoryType(categoryType === "House" ? "" : "House")}
    />
    <span>House</span>
  </label>
</div>

      </div>

    <div className="mt-10 flex flex-row flex-wrap gap-8 justify-center w-full">
  {filterProduct.length === 0 &&
    (<h1 className="text-xl font-semibold mb-10">No data found</h1>)}

  {filterProduct.map((project, index) => (
    <div key={index}
      className="flex flex-row items-center gap-6 p-4 border rounded-xl shadow-md hover:scale-95 transform w-full sm:w-[550px]">
      <img src={`http://127.0.0.1:8000/uploads/${project.image_path}`} className="w-60 h-60 object-cover rounded-lg" />
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <h5>{project.category}</h5>
        <h4 className="font-light text-gray-600">{project.location}</h4>
        <p className="text-green-500 font-semibold">${project.price}</p>
      </div>
    </div>
  ))}
</div>
    </div>
  )
}
export default Properties
