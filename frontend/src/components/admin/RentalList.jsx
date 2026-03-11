import React, { useState, useEffect } from "react";
import { AdminApi } from "./AdminApi";

const RentalList = () => {
  const [rentals, setRentals] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
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

  const loadRentals = () => {
    AdminApi.get("/admin/rentals")
      .then((res) => setRentals(res.data))
      .catch((err) => console.log(err));
  };

  const startEdit = (r) => {
    setEditingId(r.id);
    setEditData({
      title: r.title,
      category: r.category,
      owner_name: r.owner_name,
      owner_phone: r.owner_phone,
      location: r.location,
      address: r.address,
      type: r.type,
      rent_amount: r.rent_amount,
      deposit_amount: r.deposit_amount,
      furnishing: r.furnishing,
      available_from: r.available_from,
      amenities: r.amenities,
      gender: r.gender,
      status: r.status,
      main_image: null,
    });
  };

  const saveEdit = async (id) => {
    const formData = new FormData();

    Object.keys(editData).forEach((key) => {
      if (editData[key] !== null) {
        formData.append(key, editData[key]);
      }
    });

    if (editData.main_image) {
      formData.append("main_image", editData.main_image);
    }

    await AdminApi.put(`/admin/rentals/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setEditingId(null);
    loadRentals();
  };

  const deleteRental = async (id) => {
    await AdminApi.delete(`/admin/rentals/${id}`);
    loadRentals();
  };

  useEffect(() => {
    loadRentals();
  }, []);

  return (
    <div className="p-6 mt-20">
      <h1 className="text-3xl font-bold mb-6">Rentals (Admin)</h1>

      <div className="grid md:grid-cols-2 gap-6">

        {rentals.map((rental) => (
          <div key={rental.id} className="border p-4 rounded-lg shadow">

            <img
              src={`http://localhost:8000${rental.image_url}`}
              className="w-full h-60 object-cover rounded"
              alt="rental"
            />

            {editingId === rental.id ? (
              <div className="flex flex-col gap-2 mt-3">

                <input
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="border p-2 rounded"
                  placeholder="Title"
                />

                <input
                  value={editData.owner_name}
                  onChange={(e) => setEditData({ ...editData, owner_name: e.target.value })}
                  className="border p-2 rounded"
                  placeholder="Owner Name"
                />

                <input
                  value={editData.owner_phone}
                  onChange={(e) => setEditData({ ...editData, owner_phone: e.target.value })}
                  className="border p-2 rounded"
                  placeholder="Owner Phone"
                />

                <input
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  className="border p-2 rounded"
                  placeholder="Location"
                />

                <textarea
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  className="border p-2 rounded"
                  placeholder="Address"
                />

                <input
                  value={editData.rent_amount}
                  onChange={(e) => setEditData({ ...editData, rent_amount: e.target.value })}
                  className="border p-2 rounded"
                  placeholder="Rent Amount"
                />

                <input
                  value={editData.deposit_amount}
                  onChange={(e) => setEditData({ ...editData, deposit_amount: e.target.value })}
                  className="border p-2 rounded"
                  placeholder="Deposit"
                />

                <input
                  type="file"
                  onChange={(e) => setEditData({ ...editData, main_image: e.target.files[0] })}
                />

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveEdit(rental.id)}
                    className="bg-green-600 text-white px-3 py-2 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-3 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            ) : (
              <>

                <h1 className="text-xl font-bold mt-2">{rental.title}</h1>
                <p className="text-sm">{rental.location}</p>
                <p className="text-green-600 font-semibold">₹{rental.rent_amount}</p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => startEdit(rental)}
                    className="bg-yellow-500 text-white px-3 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRental(rental.id)}
                    className="bg-red-600 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>

              </>
            )}

          </div>
        ))}

      </div>
    </div>
  );
};

export default RentalList;
