import React from "react";

export const TechStack = ({
  techStack,
  onChange,
  onImageChange,
  onAddTechStack,
}) => {
  return (
    <div className="border border-dashed flex flex-col border-custom-purple p-4 mt-6">
      <label className="text-webDescrip font-semibol text-[20px] ">
        Tech Stack
      </label>
      {techStack.map((tech, index) => (
        <div key={index} className="mb-4">
          <label className="text-webDescrip font-semibold">Tech Name</label>
          <input
            type="text"
            name="name"
            value={tech.name}
            onChange={(e) => onChange(e, index)}
            placeholder="Tech Name"
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div className="mt-4">
          <label className="text-webDescrip font-semibold">Tech Type</label>
          <input
            type="text"
            name="type"
            value={tech.type}
            onChange={(e) => onChange(e, index)}
            placeholder="Technology Type"
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          </div>
          <div className="mt-4">
          <label className="text-webDescrip font-semibold mt-2 block">
            Upload Image
          </label>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={(e) => onImageChange(e, index)}
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {/* Image Preview */}
          {tech.img && (
            <img
              src={tech.img}
              alt={tech.name}
              className="block mt-2 w-16 h-16 object-cover"
            />
          )}
          </div>
        </div>
      ))}
      <div>
      <button
        type="button"
        onClick={onAddTechStack}
        className="text-white text-[16px] px-4 py-2 bg-blue-500 rounded-full  hover:bg-blue-600"
      >
        Add Tech Stack
      </button>
      </div>
    </div>
  );
};
