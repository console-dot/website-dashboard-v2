import React from "react";

function WhyChooseUs({ data = [], onChange, cardLabels = [] }) {

  return (
    <div>
      {data.map((description, index) => (
        <div key={index} className="mt-4">
          <label className="text-webDescrip font-semibold">
            {cardLabels[index] || ""}
          </label>
          <textarea
            placeholder="Description"
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
            value={description}
            onChange={(e) => onChange(index, e)}
          />
        </div>
      ))}
    </div>
  );
}

export default WhyChooseUs;
