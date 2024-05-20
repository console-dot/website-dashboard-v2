import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OpenPositionsCard } from "./OpenPositionsCard";
import { Button } from "../Button";
import { FaPlus, FaTrash, FaPen } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { RiLoader3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setopData } from "../../redux/openpositionSlice";
import {
  getOpenPosition,
  addPosition,
  editOpenPosition,
  deleteOpenPosition,
} from "../../api/openposition";

export const OpenPositionsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [positions, setPositions] = useState([]);
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
    getOpenPosition()
      .then((res) => {
        setPositions(res?.data);
        dispatch(setopData(res?.data));
      })
      .catch((err) => console.log(err));
  }, []);

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

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // If id exist then call Edit else call Add
    if (editingId !== null) {
      console.log("editingId", editingId);
      editOpenPosition(formData, editingId)
        .then((res) => {
          console.log("res", res);
          if (res?.status == 200) {
            getOpenPosition()
              .then((res) => {
                setPositions(res?.data);
                dispatch(setopData(res?.data));
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
      handleModalClose();
    } else {
      addPosition(formData)
        .then((res) => {
          console.log("res", res);
          if (res?.status == 201) {
            getOpenPosition()
              .then((res) => {
                setPositions(res?.data);
                dispatch(setopData(res?.data));
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
      handleModalClose();
    }
    setIsLoading(false);
  };

  const handleEdit = (_id) => {
    const positionToEdit = positions.find((pos) => pos._id === _id);
    setFormData(positionToEdit);
    setEditingId(_id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteOpenPosition(id)
      .then(() => {
        const updatedPositions = positions.filter((pos) => pos._id !== id);
        setPositions(updatedPositions);
        // console.log("updatedPositions", updatedPositions);
        dispatch(setopData(updatedPositions));
        toast.success("Position deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error deleting position");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="flex flex-row w-[90%] m-auto justify-between items-center">
        <h2 className="text-black text-2xl font-bold">Open Positions Page</h2>

        <button
          type="button"
          onClick={handleAddPosition}
          className="text-white btn btn-success"
        >
          <FaPlus />
          Add Position
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div
            className="relative w-[90%] my-6 mx-auto max-w-sm"
            ref={modalRef}
          >
            <div className="bg-white border border-dashed flex flex-col border-custom-purple  mt-6">
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
                    <div className="grid grid-cols-1 gap-2">
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
                          Employment Type
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

                    <div className="mt-4 flex gap-2 justify-center">
                      <button
                        className="text-white btn btn-accent btn-sm opacity-70 hover:opacity-100"
                        type="submit"
                        onClick={handleModalSubmit}
                        disabled={isLoading}
                      >
                        Update
                      </button>
                      <button
                        className="text-white btn btn-error btn-sm opacity-70 hover:opacity-100"
                        type="submit"
                        onClick={() => setIsModalOpen(false)}
                        disabled={isLoading}
                      >
                        Close
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
            <div key={item._id}>
              <OpenPositionsCard
                data={item}
                onEdit={() => handleEdit(item._id)}
                onDelete={() => handleDelete(item._id)}
              />
              <hr className="my-4" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
