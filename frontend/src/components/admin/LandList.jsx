import React, { useState, useEffect } from "react";
import { AdminApi } from "./AdminApi";

const LandList = () => {
  const [location, setLocation] = useState("");
  const [sortLowHigh, setSortLowHigh] = useState(false);
  const [sortHighLow, setSortHighLow] = useState(false);
  const [landType, setLandType] = useState("");

  const [lands, setLands] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    location: "",
    price: "",
    sqft: "",
    land_type: "",
    road_access: "",
    description: "",
    image: null,
  });
  const loadLands = () => {
    const adminToken = localStorage.getItem("adminToken");
    AdminApi.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;

    AdminApi.get("/admin/lands")
      .then((res) => setLands(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadLands();
  }, []);
  const deleteLand = async (id) => {
    await AdminApi.delete(`/admin/lands/${id}`);
    loadLands();
  };
  const startEdit = (land) => {
    setEditingId(land.id);
    setEditData({
      title: land.title,
      location: land.location,
      price: land.price,
      sqft: land.sqft,
      land_type: land.land_type,
      road_access: land.road_access,
      description: land.description,
      image: null,
    });
  };
  const saveEdit = async (id) => {
    const formData = new FormData();
    Object.keys(editData).forEach((key) => {
      if (key !== "image") formData.append(key, editData[key]);
    });
    if (editData.image) formData.append("image", editData.image);

    await AdminApi.put(`/admin/lands/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setEditingId(null);
    loadLands();
  };
  let filtered = [...lands];

  if (location.trim() !== "") {
    filtered = filtered.filter((p) =>
      p.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (landType) {
    filtered = filtered.filter((p) => p.land_type === landType);
  }

  const toNumber = (price) =>
    parseFloat(String(price).replace(/[^0-9]/g, "")) || 0;

  if (sortLowHigh) {
    filtered.sort((a, b) => toNumber(a.price) - toNumber(b.price));
  }

  if (sortHighLow) {
    filtered.sort((a, b) => toNumber(b.price) - toNumber(a.price));
  }

  const clearFunction = () => {
    setLocation("");
    setSortHighLow(false);
    setSortLowHigh(false);
    setLandType("");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-30" id="lands">

      <h1 className="text-2xl sm:text-4xl font-bold mb-2">
        Lands
        <span className="underline underline-offset-2 decoration-1 font-light pl-3">
          From Us
        </span>
      </h1>

      {/* FILTERS */}
      <div className="flex flex-col gap-2 border w-full max-w-lg mx-auto px-5 sm:px-10">
        <div className="border-b-1 flex justify-between p-2">
          <h1 className="text-xl">FILTERS</h1>
          <button onClick={clearFunction} className="font-light text-gray-500">
            clear
          </button>
        </div>

        {/* LOCATION FILTER */}
        <div className="p-5">
          <h1 className="font-semibold">Location</h1>
          <input
            className="p-1 border rounded"
            type="search"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="search location" />
        </div>

        {/* SORT */}
        <div className="p-5">
          <h1 className="font-semibold">Sort By</h1>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sortLowHigh}
              onChange={() => {
                setSortHighLow(false);
                setSortLowHigh(!sortLowHigh);
              }}/>
            <span>Price Low to High</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sortHighLow}
              onChange={() => {
                setSortLowHigh(false);
                setSortHighLow(!sortHighLow);
              }}/>
            <span>Price High to Low</span>
          </label>
        </div>

        {/* LAND TYPE */}
        <div className="p-5">
          <h1 className="font-semibold">Land Type</h1>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={landType === "agriculture"}
              onChange={() =>
                setLandType(landType === "agriculture" ? "" : "agriculture")
              }/>
            <span>Agriculture</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={landType === "commercial"}
              onChange={() =>
                setLandType(landType === "commercial" ? "" : "commercial")
              }/>
            <span>Commercial</span>
          </label>
        </div>
      </div>
      {/* LIST */}
      <div className="mt-10 flex flex-row flex-wrap gap-8 justify-center w-full">
        {filtered.length === 0 && (
          <h1 className="text-xl font-semibold mb-10">No data found</h1>
        )}

        {filtered.map((land, index) => (
          <div key={land.id || index} className="w-full sm:w-[550px]">
            <img
              src={`http://127.0.0.1:8000${land.main_image}`}
              className="w-60 h-60 object-cover rounded-lg"/>
            {/* EDIT MODE */}
            {editingId === land.id ? (
              <div className="flex flex-col gap-2 p-4 border rounded-xl shadow-md">
                {Object.keys(editData).map((key) =>
                  key !== "image" ? (
                    <input
                      key={key}
                      value={editData[key]}
                      onChange={(e) =>
                        setEditData({ ...editData, [key]: e.target.value })
                      }
                      className="border p-2 rounded"
                      placeholder={key}/>
                  ) : null
                )}
                <input
                  type="file"
                  onChange={(e) =>
                    setEditData({ ...editData, image: e.target.files[0] })
                  }/>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveEdit(land.id)}
                    className="bg-green-600 text-white p-2 rounded" >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white p-2 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center gap-6 p-4 border rounded-xl shadow-md">
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold">{land.title}</h1>
                  <h5>{land.land_type} Land</h5>
                  <h4 className="text-gray-600">{land.location}</h4>
                  <p className="text-green-500 font-semibold">₹{land.price}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => startEdit(land)}
                      className="bg-yellow-500 text-white p-1 rounded">
                      Edit
                    </button>
                    <button
                      onClick={() => deleteLand(land.id)}
                      className="bg-red-500 text-white p-1 rounded">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default LandList;
