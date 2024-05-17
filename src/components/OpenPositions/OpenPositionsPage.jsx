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
          <div
            className="relative w-[90%] my-6 mx-auto max-w-sm"
            ref={modalRef}
          >
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
                      <button
                        type="submit"
                        onClick={handleModalSubmit}
                        disabled={isLoading}
                        className={`text-white text-[16px] w-[300px] h-[48px] px-5 bg-gradient-to-r from-fromclr to-toclr hover:bg-gradient-to-r hover:from-toclr hover:to-fromclr rounded-full flex justify-center items-center focus:outline-none relative`}
                      >
                        {isLoading ? (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <RiLoader3Line className="animate-spin h-5 w-5 mr-3" />

                            <span>Submitting</span>
                          </div>
                        ) : (
                          <p className="font-Lato text-base font-medium leading-[28px] tracking-normal">
                            Submit
                          </p>
                        )}
                      </button>
                      <button
                        type="submit"
                        onClick={() => setIsModalOpen(false)}
                        disabled={isLoading}
                        className={`text-white text-[16px] w-[300px] h-[48px] px-5 bg-gradient-to-r from-fromclr to-toclr hover:bg-gradient-to-r hover:from-toclr hover:to-fromclr rounded-full flex justify-center items-center focus:outline-none relative`}
                      >
                        <p className="font-Lato text-base font-medium leading-[28px] tracking-normal">
                          Cancel
                        </p>
                      </button>
                      <ToastContainer />
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
