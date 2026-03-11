import React, { useState } from "react";
import { AdminApi } from "./AdminApi";

const AddRentalForm = () => {
  const [data, setData] = useState({
    title: "",
    category: "",
    owner_name: "",
    owner_phone: "",
    location: "",
    address: "",
    type: "",
    rent_amount: "",
    deposit_amount: "",
    furnishing: "",
    available_from: "",
    amenities: "",
    gender: "",
    status: "",
    main_image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.main_image) {
      alert("Please upload an image!");
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      await AdminApi.post("/admin/rentals", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Rental added successfully!");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Error adding rental");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100 mt-20">
      <h2 className="text-3xl font-bold mb-6">Add Rental</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-6 w-full max-w-lg flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          required/>

        <select
          className="border p-2 rounded"
          value={data.category}
          onChange={(e) => setData({ ...data, category: e.target.value })}
          required >
          <option value="">Select Category</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="pg">PG</option>
          <option value="co-living">Co-living</option>
        </select>

        <input
          type="text"
          placeholder="Owner Name"
          className="border p-2 rounded"
          value={data.owner_name}
          onChange={(e) => setData({ ...data, owner_name: e.target.value })}
          required/>

        <input
          type="number"
          placeholder="Owner Phone"
          className="border p-2 rounded"
          value={data.owner_phone}
          onChange={(e) => setData({ ...data, owner_phone: e.target.value })}
          required/>

        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded"
          value={data.location}
          onChange={(e) => setData({ ...data, location: e.target.value })}
          required/>

        <textarea
          placeholder="Full Address"
          className="border p-2 rounded"
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
          required/>

        <input
          type="text"
          placeholder="Type (1BHK / 2BHK / Shared room etc.)"
          className="border p-2 rounded"
          value={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
          required/>

        <input
          type="number"
          placeholder="Rent Amount"
          className="border p-2 rounded"
          value={data.rent_amount}
          onChange={(e) => setData({ ...data, rent_amount: e.target.value })}
          required/>

        <input
          type="number"
          placeholder="Deposit"
          className="border p-2 rounded"
          value={data.deposit_amount}
          onChange={(e) => setData({ ...data, deposit_amount: e.target.value })}/>

        <select
          className="border p-2 rounded"
          value={data.furnishing}
          onChange={(e) => setData({ ...data, furnishing: e.target.value })}>
          <option value="">Furnishing</option>
          <option value="unfurnished">Unfurnished</option>
          <option value="semi-furnished">Semi-Furnished</option>
          <option value="fully-furnished">Fully-Furnished</option>
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          value={data.available_from}
          onChange={(e) => setData({ ...data, available_from: e.target.value })}/>

        <textarea
          placeholder="Amenities (comma separated)"
          className="border p-2 rounded"
          value={data.amenities}
          onChange={(e) => setData({ ...data, amenities: e.target.value })}/>

        <select
          className="border p-2 rounded"
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}>
          <option value="">Gender Preference</option>
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          className="border p-2 rounded"
          value={data.status}
          onChange={(e) => setData({ ...data, status: e.target.value })}
        >
          <option value="">Status</option>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="removed">Removed</option>
        </select>

        <input
          type="file"
          accept="image/*"
          className="border p-2 rounded"
          onChange={(e) =>
            setData({ ...data, main_image: e.target.files[0] })
          }
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Add Rental
        </button>
      </form>
    </div>
  );
};

export default AddRentalForm;
