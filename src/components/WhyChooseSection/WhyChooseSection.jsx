import React from "react";

function WhyChooseSection({ descriptions = [], minCards = 3, maxCards = 4, onChange, cardLabels = [] }) {
  const handleInputChange = (index, value) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    onChange(newDescriptions);
  };

  const addCard = () => {
    if (descriptions.length < maxCards) {
      onChange([...descriptions, ""]);
    }
  };

  const removeCard = (index) => {
    if (descriptions.length > minCards) {
      const newDescriptions = [...descriptions];
      newDescriptions.splice(index, 1);
      onChange(newDescriptions);
    }
  };

  return (
    <div>
      {descriptions.map((description, index) => (
        <div key={index} className="mb-2">
          <label className="text-webDescrip font-semibold">{cardLabels[index] || ''}</label>
          <textarea
            type="text"
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={description}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          {descriptions.length > minCards && (
            <div className="flex flex-row justify-start items-center">
              <button className="text-sm text-red-500" onClick={() => removeCard(index)}>
                Remove card {index + 1}
              </button>
            </div>
          )}
        </div>
      ))}
      {descriptions.length < maxCards && (
        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={addCard}>
          Add Card
        </button>
      )}
    </div>
  );
}

export default WhyChooseSection;
