import React from "react";

function WhyChooseSection({ descriptions = [], minCards = 3, maxCards = 4, onChange, cardLabels = [] }) {
  const handleInputChange = (index, field, value) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = { ...newDescriptions[index], [field]: value };
    onChange(newDescriptions);
  };

  const handleImageChange = (index, file) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = { ...newDescriptions[index], imageFile: file };
    onChange(newDescriptions);
  };

  const addCard = () => {
    if (descriptions.length < maxCards) {
      onChange([...descriptions, { name: "", description: "", image: "", imageFile: null }]);
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
        <div key={index} className="mt-4">
          <label className="text-webDescrip font-semibold">{cardLabels[index] || ''}</label>
          <input
            type="text"
            placeholder="Name"
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={description.name}
            onChange={(e) => handleInputChange(index, "name", e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
            value={description.description}
            onChange={(e) => handleInputChange(index, "description", e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
            onChange={(e) => handleImageChange(index, e.target.files[0])}
          />
          {descriptions.length > minCards && (
            <div className="flex flex-row justify-start items-center mt-2">
              <button className="text-sm text-red-500" onClick={() => removeCard(index)}>
                Remove card {index + 1}
              </button>
            </div>
          )}
        </div>
      ))}
      {descriptions.length < maxCards && (
        <button className="bg-blue-500 text-white px-2 py-1 rounded mt-2" onClick={addCard}>
          Add Card
        </button>
      )}
    </div>
  );
}

export default WhyChooseSection;
