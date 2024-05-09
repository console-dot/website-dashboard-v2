import React from "react";

export default function CreateExpertiseModal({
  handleImageUpload,
  handleChange,
  closeModal,
  handleAddExpertise,
  formData,
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-10">
      <div className="bg-white border border-dashed flex flex-col border-custom-purple p-4 mt-6">
        <div className="mt-4">
          <label className="text-webDescrip font-semibold mt-4">
            Expertise Image
          </label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="file"
            name="expertiseImage"
            id="expertiseImage"
            onChange={handleImageUpload}
            placeholder="Expertise Image"
          />
          {formData.expertiseImage && (
            <div>
              <label className="text-webDescrip font-semibold mt-4">
                Preview:
              </label>
              <img
                src={formData.expertiseImage}
                alt="Expertise Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  marginTop: "10px",
                }}
              />
            </div>
          )}
        </div>
        <div className="mt-4">
          <label className="text-webDescrip font-semibold mt-4">
            Expertise Name
          </label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="expertiseName"
            id="expertiseName"
            onChange={handleChange}
            value={formData?.expertiseName}
            placeholder="Expertise Name"
          />
        </div>
        <div className="mt-4">
          <label className="text-webDescrip font-semibold mt-4">
            Expertise Description
          </label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="expertiseDescription"
            id="expertiseDescription"
            onChange={handleChange}
            value={formData?.expertiseDescription}
            placeholder="Expertise Description"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleAddExpertise}
            className="text-white text-[16px] px-4 py-2 bg-blue-500 rounded-full  hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
