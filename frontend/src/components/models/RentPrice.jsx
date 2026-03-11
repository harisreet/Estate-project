import React, { useState } from "react";
import { api } from "../../api";

const RentPrice = () => {
  const [predictedPrice, setPredictedPrice] = useState(0);

  const [datas, setDatas] = useState({
    area: "",
    bhk: "",
    bathroom: "",
    furnishing: "",
    area_type: "",
    tenant_preferred: "",
    current_floor: "",
    total_floors: ""
  });

  const handleChange = (e) => {
    setDatas({
      ...datas,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    const sendData = {
      ...datas,
      area: Number(datas.area),
      bhk: Number(datas.bhk),
      bathroom: Number(datas.bathroom),
      current_floor: Number(datas.current_floor),
      total_floors: Number(datas.total_floors),
      property_type: "rent"   // fixed type for backend
    };

    api.post("/price/predict", sendData)
      .then((res) => {
        setPredictedPrice(res.data.predicted_price);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">

      <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
        Rent Price Prediction
      </h2>

      {/* Rent Inputs */}
      <div className="grid grid-cols-1 gap-4">

        <input
          type="number"
          name="area"
          onChange={handleChange}
          placeholder="Enter property area (sqft)"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="bhk"
          onChange={handleChange}
          placeholder="Total BHK"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="bathroom"
          onChange={handleChange}
          placeholder="Total Bathrooms"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        />

        <div>
          <label className="block text-gray-700 font-medium mb-1">Furnishing</label>
          <select
            name="furnishing"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            <option value="Furnished">Fully Furnished</option>
            <option value="Semi-Furnished">Semi Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </div>

        {/* Rent-specific fields */}
        <select
          name="area_type"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Area Type</option>
          <option value="Carpet Area">Carpet Area</option>
          <option value="Super Area">Super Area</option>
        </select>

        <select
          name="tenant_preferred"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Allowed For</option>
          <option value="Bachelors">Bachelors</option>
          <option value="Family">Family</option>
          <option value="Bachelors/Family">Both</option>
        </select>

        <input
          type="number"
          name="current_floor"
          onChange={handleChange}
          placeholder="Current Floor"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="total_floors"
          onChange={handleChange}
          placeholder="Total Floors"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        onClick={handleClick}
      >
        Predict Rent
      </button>

      <p className="mt-4 text-center text-lg font-semibold">
        Predicted Rent: ₹ {predictedPrice}
      </p>
    </div>
  );
};

export default RentPrice;
