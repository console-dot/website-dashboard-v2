import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { editHeroDescription, getHeroDescription } from "../../api";
import { setHeroDescriptionData } from "../../redux";

export const OpenPositionsPage = ({ setIsValid, isValid }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    jobCategory: "",
    experience: "",
    noOfPositions: "",
    qualifications: "",
    employmentType: "",
    designation: "",
    capacity: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [herodata, setHeroData] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    getOpenPosition()
      .then((res) => {
        if (res == 403) {
          setIsValid(false);
        }
        setPositions(res?.data);
        dispatch(setopData(res?.data));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("isValid", isValid);
    if (!isValid) {
      toast.warning("You Session has been Expired. Please Login Again", {
        autoClose: 1500,
        onClose: () => {},
      });
    }
  }, [location.pathname, isValid]);


  // Fetch hero description data
  useEffect(() => {
    getHeroDescription()
      .then((res) => {
        setHeroData(res?.data);
        dispatch(setHeroDescriptionData(res?.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const handleAddPosition = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      jobCategory: "",
      experience: "",
      noOfPositions: "",
      qualifications: "",
      employmentType: "",
      designation: "",
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

  const [openPositionHero, setopenPositionHero] = useState(
    herodata?.openPositionHero || ""
  );

  useEffect(() => {
    setopenPositionHero(herodata?.openPositionHero || "");
  }, [herodata]);

  const handleHeroDescription = async (e) => {
    e.preventDefault();
    try {
      const res = await editHeroDescription({ openPositionHero }, herodata._id);
      setopenPositionHero(res?.openPositionHero);
      alert("Hero description updated successfully!");
    } catch (err) {
      alert("Failed to update hero description");
    }
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
                          Category
                        </label>
                        <input
                          className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="text"
                          name="jobCategory"
                          onChange={handleChange}
                          value={formData?.jobCategory?.toLowerCase()}
                          placeholder="Category"
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
                          value={formData?.employmentType?.toLowerCase()}
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
                        Submit
                      </button>
                      <button
                        className="text-white btn btn-error btn-sm opacity-70 hover:opacity-100"
                        type="submit"
                        // onClick={() => setIsModalOpen(false)}
                        onClick={handleModalClose}
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
          {/* hero description */}
          <div className="flex flex-col" style={{ width: "70%" }}>
                    <label className="" style={{ color: "grey" }}>
                      Hero Description
                    </label>
                    <div className="flex flex-row gap-2">
                      <textarea
                        className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="openPositionHero"
                        id="openPositionHero"
                        onChange={(e) => setopenPositionHero(e.target.value)}
                        value={openPositionHero}
                        placeholder="Hero Description"
                      />
                      <button
                        className="bg-blue-500 text-white py-1 px-6 rounded-lg"
                        type="button"
                        onClick={handleHeroDescription}
                      >
                        Update
                      </button>
                    </div>
                    <div className="border-b border-solid border-custom-purple mt-2"></div>
                  </div>
          {positions.map((item) => (
            <div key={item._id}>
              <OpenPositionsCard
                data={item}
                herodata={herodata}
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
