import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OpenPositionsCard } from "./OpenPositionsCard";
import { Button } from "../Button";
import { FaPlus, FaTrash, FaPen } from "react-icons/fa";

export const OpenPositionsPage = () => {
  const navigate = useNavigate();

  const [positions, setPositions] = useState([
    {
      id: 1,
      jobType: "FullStack",
      experience: "4-years.",
      noOfPositions: "2",
      qualifications: "BSCS",
      employmentType: "Full-Time",
      designation: "Senior",
      noOfRequest: "3",
      capacity: "2",
    },
  ]);

  const [formData, setFormData] = useState({
    jobType: "",
    experience: "",
    noOfPositions: "",
    qualifications: "",
    employmentType: "",
    designation: "",
    noOfRequest: "",
    capacity: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleModalClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleAddPosition = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      jobType: "",
      experience: "",
      noOfPositions: "",
      qualifications: "",
      employmentType: "",
      designation: "",
      noOfRequest: "",
      capacity: "",
    });
  };

  const handleModalSubmit = () => {
    if (editingId !== null) {
      // Editing existing position
      const updatedPositions = positions.map((pos) =>
        pos.id === editingId ? { ...pos, ...formData } : pos
      );
      setPositions(updatedPositions);
    } else {
      // Adding new position
      const newId = Math.max(...positions.map((pos) => pos.id), 0) + 1;
      setPositions([...positions, { id: newId, ...formData }]);
    }
    handleModalClose();
    // Here you can add code to submit formData to your backend
    console.log("Form data submitted:", formData);
  };

  const handleEdit = (id) => {
    const positionToEdit = positions.find((pos) => pos.id === id);
    setFormData(positionToEdit);
    setEditingId(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updatedPositions = positions.filter((pos) => pos.id !== id);
    setPositions(updatedPositions);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div
        className="w-[90%] m-auto"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="text-black text-2xl font-bold">Open Positions Page</h2>
        <div className="z-10">
          <Button
            text={"Add Position"}
            icon={<FaPlus />}
            click={handleAddPosition}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-[90%] my-6 mx-auto max-w-sm"  ref={modalRef}> 
            <div className="border-1 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-200 border-dashed border-emerald-500 outline-none focus:outline-none">
              <div className="relative p-6 flex-auto">
                <form
                  className="flex flex-col w-full"
                  onSubmit={handleModalSubmit}
                >
                  {/* introduction start */}
                  <div>
                    <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center">
                      Add New Position
                    </h1>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-webDescrip font-semibold mt-4">
                          Job Type
                        </label>
                        <input
                          className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="text"
                          name="jobType"
                          onChange={handleChange}
                          value={formData?.jobType}
                          placeholder="Job Type"
                        />
                      </div>
                      <div>
                        <label className="text-webDescrip font-semibold mt-4">
                          Experience
                        </label>
                        <input
                          className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="text"
                          name="experience"
                          onChange={handleChange}
                          value={formData?.experience}
                          placeholder="Experience"
                        />
                      </div>
                      <div>
                        <label className="text-webDescrip font-semibold mt-4">
                          No of Positions
                        </label>
                        <input
                          className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="text"
                          name="noOfPositions"
                          onChange={handleChange}
                          value={formData?.noOfPositions}
                          placeholder="No Of Positions"
                        />
                      </div>
                      <div>
                        <label className="text-webDescrip font-semibold mt-4">
                        Qualifications
                        </label>
                        <input
                          className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="text"
                          name="qualifications"
                          onChange={handleChange}
                          value={formData?.qualifications}
                          placeholder="Qualifications"
                        />
                      </div>
                      <div>
                        <label className="text-webDescrip font-semibold mt-4">
                          Job Type
                        </label>
                        <input
                          className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="text"
                          name="employmentType"
                          onChange={handleChange}
                          value={formData?.employmentType}
                          placeholder="Employment Type"
                        />
                      </div>
                      <div>
                        <label className="text-webDescrip font-semibold mt-4">
                        Designation
                        </label>
                        <input
                          className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="text"
                          name="designation"
                          onChange={handleChange}
                          value={formData?.designation}
                          placeholder="Designation"
                        />
                      </div>
                      <div>
                        <label className="text-webDescrip font-semibold mt-4">
                        No Of Request
                        </label>
                        <input
                          className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="text"
                          name="noOfRequest"
                          onChange={handleChange}
                          value={formData?.noOfRequest}
                          placeholder="noOfRequest"
                        />
                      </div>
                      <div>
                        <label className="text-webDescrip font-semibold mt-4">
                        Capacity
                        </label>
                        <input
                          className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="text"
                          name="capacity"
                          onChange={handleChange}
                          value={formData?.capacity}
                          placeholder="Capacity"
                        />
                      </div>
                      {/* Add similar structures for other fields */}
                    </div>
                    {/* introduction End */}

                    <div className="w-full flex justify-center items-center mt-4 mb-4">
                      <button className="text-white text-[16px] w-[300px] px-5 py-2.5 bg-gradient-to-r from-fromclr to-toclr hover:bg-gradient-to-r hover:from-toclr hover:to-fromclr rounded-full focus:outline-none active:bg-gradient-to-r active:from-custom-purple active:to-custom-blue">
                        <p className="font-Lato text-base font-medium leading-[28px] tracking-normal">
                          Submit
                        </p>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display Positions */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex flex-col w-full">
          {positions.map((item) => (
            <div key={item.id}>
              <OpenPositionsCard
                data={item}
                onEdit={() => handleEdit(item.id)}
                onDelete={() => handleDelete(item.id)}
              />
              <hr className="my-4" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
