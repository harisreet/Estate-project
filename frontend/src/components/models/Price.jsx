import React, { useEffect, useState } from 'react';
import {api} from '../../api'

const Price = () => {

  const [optionValue, setOptionValue] = useState("sale");
  const [predictedPrice,setPredictedPrice] = useState(0);
  const [datas, setDatas] = useState({
    area: "",
    bhk: "",
    bathroom: "",
    furnishing: "",
    // sale fields
    status: "unknown",
    parking: "0",
    type: "unknown",
    transaction: "unknown",
    // rent fields
    area_type: "unknown",
    tenant_preferred: "unknown",
    current_floor: "0",
    total_floors:"0"
  });
  const handleClick = () =>{
     const sendData = {
    ...datas,
    property_type: optionValue,
    area: Number(datas.area),
    bhk: Number(datas.bhk),
    bathroom: Number(datas.bathroom),
    parking: Number(datas.parking),
    current_floor: Number(datas.current_floor),
    total_floors: Number(datas.total_floors)
  };
    api.post("/price/predict",sendData)
    .then((res)=>{
      setPredictedPrice(res.data.predicted_price);
    })
    .catch((err)=> console.log(err))
  }
  const handleChange = (e) => {
    setDatas({
      ...datas,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">

      <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
        Property Price Prediction
      </h2>

      {/* Prediction Type */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Prediction Type
        </label>
        <select
          value={optionValue}
          onChange={(e) => setOptionValue(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        >
          <option value="sale">House Price Sale</option>
          <option value="rent">Rent Price Prediction</option>
        </select>
      </div>

      {/* Common Fields */}
      <div className="grid grid-cols-1 gap-4">
        <input
          type="number"
          name="area"
          onChange={handleChange}
          placeholder="Enter area of the property"
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
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Furnished">Fully-Furnished</option>
            <option value="Unfurnished">Not Furnished</option>
          </select>
        </div>
      </div>

      {/* Sale Fields */}
      {optionValue === "sale" ? (
        <div className="mt-4 grid grid-cols-1 gap-4">

          <select
            name="status"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Construction Status</option>
            <option value="Ready_to_move">Ready to Move</option>
            <option value="Almost_ready">Almost Ready</option>
          </select>

          <input
            type="number"
            name="parking"
            onChange={handleChange}
            placeholder="Total Parking"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="type"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Property Type</option>
            <option value="Builder_Floor">Builder Floor</option>
            <option value="Apartment">Apartment</option>
          </select>

          <select
            name="transaction"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Sale Type</option>
            <option value="New_Property">New Property</option>
            <option value="Resale">Resale</option>
          </select>

        </div>
      ) : (
        // Rent Fields
        <div className="mt-4 grid grid-cols-1 gap-4">

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
            <option value="Bachelors">Bachelor</option>
            <option value="Family">Family</option>
            <option value="Bachelors/Family">Bachelor/Family</option>
          </select>

          <input
            type="number"
            name="current_floor"
            onChange={handleChange}
            placeholder="current floor number"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="total_floors"
            onChange={handleChange}
            placeholder="total floor number"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />

        </div>
      )}

      <button
        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        onClick={handleClick} // <-- send this to ML backend
      >
        Predict Price
      </button>
      <p>the predicted price : {predictedPrice}</p>
    </div>
  );
};

export default Price;
