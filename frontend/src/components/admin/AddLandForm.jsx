import React, { useState } from "react";
import { AdminApi } from "./AdminApi";

const AddLandForm = () => {
  const [land, setLand] = useState({
    title: "",
    location: "",
    price: "",
    sqft: "",
    land_type: "",
    road_access: "",
    description: "",
    main_image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!land.main_image) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("title", land.title);
    formData.append("location", land.location);
    formData.append("price", land.price);
    formData.append("sqft", land.sqft);
    formData.append("land_type", land.land_type);
    formData.append("road_access", land.road_access);
    formData.append("description", land.description);
    formData.append("main_image", land.main_image);

    try {
      await AdminApi.post("/admin/lands", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Land added successfully!");
      setLand({
        title: "",
        location: "",
        price: "",
        sqft: "",
        land_type: "",
        road_access: "",
        description: "",
        main_image: null,
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error adding land");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4 mt-30">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Land Project</h2>

      <div className="bg-white shadow-2xl rounded-xl p-6 w-full max-w-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={land.title}
            onChange={(e) => setLand({ ...land, title: e.target.value })}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <input
            type="text"
            placeholder="Location"
            value={land.location}
            onChange={(e) => setLand({ ...land, location: e.target.value })}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <input
            type="number"
            placeholder="Price"
            value={land.price}
            onChange={(e) => setLand({ ...land, price: e.target.value })}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input
            type="number"
            placeholder="Square Feet"
            value={land.sqft}
            onChange={(e) => setLand({ ...land, sqft: e.target.value })}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <select
            value={land.land_type}
            onChange={(e) => setLand({ ...land, land_type: e.target.value })}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">Select Land Type</option>
            <option value="Agricultural">Agricultural</option>
            <option value="Commercial">Commercial</option>
          </select>
          <input
            type="text"
            placeholder="Road Access"
            value={land.road_access}
            onChange={(e) => setLand({ ...land, road_access: e.target.value })}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <textarea
            placeholder="Description"
            value={land.description}
            onChange={(e) => setLand({ ...land, description: e.target.value })}
            rows="4"
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLand({ ...land, main_image: e.target.files[0] })}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition duration-200">
            Add Land
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLandForm;
