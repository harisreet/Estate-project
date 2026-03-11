import React, { useState } from "react";
import { AdminApi } from "./AdminApi";

const AddHouseForm = () => {
  const [house, setHouse] = useState({title: "", price: "", location: "", category: "", image: null, });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!house.image) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("title", house.title);
    formData.append("price", house.price);
    formData.append("location", house.location);
    formData.append("category", house.category);
    formData.append("image", house.image); 

    try {
      await AdminApi.post("/admin/houses", formData, {
        headers: { "Content-Type": "multipart/form-data" }, });

      alert("House added successfully!");
      setHouse({ title: "", price: "", location: "", image: null });
      window.location.reload(); 
    } catch (err) {
      console.error(err);
      alert("Error adding house");
    }};

  return (
   <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Project</h2>

  <div className="bg-white shadow-2xl rounded-xl p-6 w-full max-w-md">
    <form className="flex flex-col gap-4"  onSubmit={handleSubmit} >
      <input type="text" placeholder="Title" value={house.title} onChange={(e) => setHouse({ ...house, title: e.target.value })}
        required className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
      <input type="number" placeholder="Price" value={house.price} onChange={(e) => setHouse({ ...house, price: e.target.value })}
        required className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
      <input type="text" placeholder="Location" value={house.location} onChange={(e) => setHouse({ ...house, location: e.target.value })} required
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <input type="text" placeholder="Category" value={house.category} onChange={(e) => setHouse({ ...house, category: e.target.value })} required
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <input type="file" accept="image/*" onChange={(e) => setHouse({ ...house, image: e.target.files[0] })} required
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>

      <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition duration-200" >
        Add House</button>
    </form>
  </div>
</div>
);
};

export default AddHouseForm;
