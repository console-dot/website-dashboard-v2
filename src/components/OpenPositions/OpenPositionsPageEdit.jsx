import { useEffect, useState } from "react";
import { Button } from "../Button";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function OpenPositionsPageEdit() {

  const [formData, setFormData] = useState({
    jobType: "FullStack",
    experience: "4-years.",
    noOfPositions: "2",
    qualifications: "BSCS",
    employmentType: "Full-Time",
    designation: "Senior",
    noOfRequest: "3",
    capacity: "2",
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     {
      console.log(formData);
    }
  };

  return (
    <div className="w-full">
      <form
        className="flex justify-center flex-col w-[50%] m-auto gap-2"
        method="post"
        onSubmit={handleSubmit}
      >
        {/* introduction start */}
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center">
            Opend Positions Page Edit
          </h1>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Job Type
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="jobType"
              id="jobType"
              onChange={handleChange}
              value={formData?.jobType}
              placeholder="Job Type"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Experience
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="experience"
              id="experience"
              onChange={handleChange}
              value={formData?.experience}
              placeholder="Experience"
            />
          </div>

          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              No Of Positions
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="noOfPositions"
              id="noOfPositions"
              onChange={handleChange}
              value={formData?.noOfPositions}
              placeholder="noOfPositions"
            />
          </div>

          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Qualifications
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="qualifications"
              id="qualifications"
              onChange={handleChange}
              value={formData?.qualifications}
              placeholder="qualifications"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Employment Type
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="employmentType"
              id="employmentType"
              onChange={handleChange}
              value={formData?.employmentType}
              placeholder="employmentType"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              Designation
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="designation"
              id="designation"
              onChange={handleChange}
              value={formData?.designation}
              placeholder="designation"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              No Of Request
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="noOfRequest"
              id="noOfRequest"
              onChange={handleChange}
              value={formData?.noOfRequest}
              placeholder="noOfRequest"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold mt-4">
              capacity
            </label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="capacity"
              id="capacity"
              onChange={handleChange}
              value={formData?.capacity}
              placeholder="capacity"
            />
          </div>
        </div>
        {/* introduction End */}

        <div className="w-full flex justify-center items-center mt-4 mb-4">
          <button className="text-white text-[16px] w-[300px] px-5 py-2.5 bg-gradient-to-r from-fromclr to-toclr hover:bg-gradient-to-r hover:from-toclr hover:to-fromclr rounded-full focus:outline-none active:bg-gradient-to-r active:from-custom-purple active:to-custom-blue">
            <p className="font-Lato text-base font-medium leading-[28px] tracking-normal">
              Submit
            </p>
          </button>
        </div>
      </form>
    </div>
  );
}
