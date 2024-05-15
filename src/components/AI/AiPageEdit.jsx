import React, { useEffect, useState } from "react";
import WhyChooseSection from "../WhyChooseSection/WhyChooseSection";
import { TechStack } from "../TechStack/TechStack";
import { ToastContainer, toast } from "react-toastify";
import { RiLoader3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { selectAiDetails, setAiData } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import WhyChooseUs from "./WhyChooseUs";
import { editArtificialIntelligence } from "../../api/ai";
import { addTechStack, editTechStack, removeTechStack } from "../../api";
import { addFile } from "../../api/file";

export default function AiPageEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const aiData = useSelector(selectAiDetails);
  const [formData, setFormData] = useState(aiData);
  const [whyChooseUs, setWhyChooseUs] = useState(aiData.whyChooseUs);
  const [selectedFile, setSelectedFile] = useState(null);
  const [techData, setTechData] = useState({
    techStack: {
      name: "",
      type: "",
      image: null, // Assuming img is initially null
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cardLabels = [
    "Expertise",
    "Innovation at the Core",
    "Collaboration for Success",
    "Tailored Solutions",
  ];
  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log("f1", formData);
    const techIds = formData?.techStack?.map((item) => item._id);
    const newForm = { ...formData, whyChooseUs, techStack: techIds };
    if (aiData?._id) {
      editArtificialIntelligence(newForm, aiData?._id)
        .then((res) => {
          console.log("res", res);
          dispatch(setAiData(res?.data));
        })
        .catch((err) => console.log(err));

      setTimeout(() => {
        setIsLoading(false);
        toast.success("Form submitted", {
          autoClose: 1500, // close after 1.5 seconds
          onClose: () => navigate("/ai"), // navigate after closing
        });
      }, 1500);
    }
  };

  //Open New techStack Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOpenEditModal = (index) => {
    setEditIndex(index);
    setEditItem(formData.techStack[index]);
    setIsEditModalOpen(true);
  };
  // Delete techStack
  const handleDeleteTechStack = (index) => {
    const currentId = formData.techStack[index]?._id;
    removeTechStack(currentId).then((res) => {
      if (res.status == 200) {
        console.log("Removed Successfully");
      }
    });
    const updatedTechStack = formData.techStack.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      techStack: updatedTechStack,
    });
  };
  // handle input change for New techStack
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTechData((prevFormData) => ({
      ...prevFormData,
      techStack: {
        ...prevFormData.techStack,
        [name]: value,
      },
    }));
  };
  // handle edit techstack changes
  const handleEditInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      // If the change is in the image input field
      const file = files[0];
      setEditItem((prevItem) => ({
        ...prevItem,
        image: file,
      }));
    } else {
      // If the change is in other input fields
      setEditItem((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  };
  // handle Edit Tech Stack submission
  const handleEditTechStack = () => {
    const updatedTechStack = [...formData.techStack];
    updatedTechStack[editIndex] = editItem;
    setFormData({
      ...formData,
      techStack: updatedTechStack,
    });
    if (updatedTechStack[editIndex]?.image) {
      if (typeof updatedTechStack[editIndex]?.image === "string") {
        editTechStack(
          {
            name: updatedTechStack[editIndex]?.name,
            image: updatedTechStack[editIndex]?.image,
          },
          updatedTechStack[editIndex]?._id
        )
          .then((res) => {
            console.log("res", res);
          })
          .catch((err) => console.log(err));
      } else {
        addFile(updatedTechStack[editIndex]?.image)
          .then((res) => {
            if (res?.status == 201) {
              updatedTechStack[editIndex].image = res?.data;
              editTechStack(
                {
                  name: updatedTechStack[editIndex]?.name,
                  image: updatedTechStack[editIndex]?.image,
                },
                updatedTechStack[editIndex]?._id
              )
                .then((res) => {
                  console.log("res", res);
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      }
    }
    // Close the edit modal
    handleCloseEditModal();
  };
  // Function to close the edit modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditIndex(null);
    setEditItem(null);
  };
  // handle Input change
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle File Upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  // handle Add Tech Stack submission
  const handleAddTechStack = () => {
    const newTechStackItem = {
      name: techData.techStack.name,
      type: techData.techStack.type,
      image: techData.techStack.image,
    };

    if (selectedFile) {
      addFile(selectedFile)
        .then((res) => {
          // console.log("res", res);
          if (res?.status == 201) {
            newTechStackItem.image = res?.data;
            addTechStack(newTechStackItem)
              .then((res) => {
                console.log("res", res);
                // Add the new object to the techStack array
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  techStack: [...prevFormData.techStack, res?.data],
                }));
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
    // Close Modal
    closeModal();
  };
  // handle why choose us
  const handleWhyChooseUs = (index, event) => {
    const updatedWhyChooseUs = [...whyChooseUs];
    updatedWhyChooseUs[index] = event.target.value;
    setWhyChooseUs(updatedWhyChooseUs);
  };

  return (
    <div className="w-full mb-6">
      <form
        className="flex justify-center flex-col w-[50%] m-auto gap-2"
        method="post"
        onSubmit={handleSubmit}
      >
        {/* Custom Service Model */}
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            Ai Edit
          </h1>
          <label className="text-webDescrip font-semibold">Description</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            value={formData.description}
            placeholder="Custom Service Description"
          />

          <div className="border border-dashed border-custom-purple p-4 mt-6 ">
            <label className="text-webDescrip font-semibol text-[20px] mx-auto">
              Why Choose Us
            </label>
            <WhyChooseUs
              data={whyChooseUs}
              minCards={4}
              maxCards={4}
              onChange={handleWhyChooseUs}
              cardLabels={cardLabels}
            />
          </div>

          {/* Tech Stack */}
          <div className="border border-dashed flex flex-col border-custom-purple p-4 mt-6">
            <div className="flex flex-row  justify-between items-center">
              <label className="text-webDescrip font-semibol text-[20px] ">
                Tech Stack
              </label>

              <button
                type="button"
                onClick={openModal}
                className="text-white btn btn-success"
              >
                <FaPlus />
                Add
              </button>
            </div>

            {console.log("techstack", formData?.techStack)}
            <div className="w-full text-webDescrip font-semibold">
              Machine Learning Frameworks
            </div>
            {formData?.techStack?.map((item, index) =>
              item?.type === "Machine Learning Frameworks" ? (
                <div className="w-full flex" key={item.name}>
                  <div className="w-full flex justify-between">
                    <div>{item?.name}</div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(index)}
                        className="text-success mr-2"
                      >
                        <FaPen />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTechStack(index)}
                        className="text-error"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            )}
            {/* Backend */}
            <div className="w-full text-webDescrip font-semibold">
              Natural Language Processing
            </div>
            {formData?.techStack?.map((item, index) =>
              item?.type === "Natural Language Processing" ? (
                <div className="w-full flex" key={item.name}>
                  <div className="w-full flex justify-between">
                    <div>{item?.name}</div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(index)}
                        className="text-success mr-2"
                      >
                        <FaPen />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTechStack(index)}
                        className="text-error"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            )}
            {/* Database */}
            <div className="w-full text-webDescrip font-semibold">
              Computer Vision
            </div>
            {formData?.techStack?.map((item, index) =>
              item?.type === "Computer Vision" ? (
                <div className="w-full flex" key={item.name}>
                  <div className="w-full flex justify-between">
                    <div>{item?.name}</div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(index)}
                        className="text-success mr-2"
                      >
                        <FaPen />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTechStack(index)}
                        className="text-error"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            )}
            {/* CI/CD */}
            <div className="w-full text-webDescrip font-semibold">
              AI Model Deployment
            </div>
            {formData?.techStack?.map((item, index) =>
              item?.type === "AI Model Deployment" ? (
                <div className="w-full flex" key={item.name}>
                  <div className="w-full flex justify-between">
                    <div>{item?.name}</div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(index)}
                        className="text-success mr-2"
                      >
                        <FaPen />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTechStack(index)}
                        className="text-error"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            )}
            {/* VCS */}
            <div className="w-full text-webDescrip font-semibold">
              Data Processing
            </div>
            {formData?.techStack?.map((item, index) =>
              item?.type === "Data Processing" ? (
                <div className="w-full flex" key={item.name}>
                  <div className="w-full flex justify-between">
                    <div>{item?.name}</div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(index)}
                        className="text-success mr-2"
                      >
                        <FaPen />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTechStack(index)}
                        className="text-error"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="w-full flex justify-center items-center mt-4 mb-4">
          <button
            type="submit"
            onClick={handleSubmit}
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
          <ToastContainer />
        </div>
      </form>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white border border-dashed flex flex-col border-custom-purple p-4 mt-6">
            <label className="text-webDescrip font-semibol text-[20px] ">
              Tech Stack
            </label>
            <div className="mb-4">
              <label className="text-webDescrip font-semibold">Tech Name</label>
              <input
                type="text"
                name="name"
                value={formData?.techStack?.name}
                onChange={handleInputChange}
                placeholder="Tech Name"
                className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div className="mb-4">
                <label className="text-webDescrip font-semibold">
                  Tech Type
                </label>
                <select
                  name="type"
                  value={formData?.techStack?.type}
                  onChange={handleInputChange}
                  className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Tech Type</option>
                  <option value="Machine Learning Frameworks">
                    Machine Learning Frameworks
                  </option>
                  <option value="Natural Language Processing">
                    Natural Language Processing
                  </option>
                  <option value="Computer Vision">Computer Vision</option>
                  <option value="AI Model Deployment">
                    AI Model Deployment
                  </option>
                  <option value="Data Processing">Data Processing</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="text-webDescrip font-semibold mt-2 block">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={handleAddTechStack}
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
      )}

      {isEditModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white border border-dashed flex flex-col border-custom-purple p-4 mt-6">
            <label className="text-webDescrip font-semibol text-[20px] ">
              Tech Stack
            </label>
            <div className="mb-4">
              <label className="text-webDescrip font-semibold">Tech Name</label>
              <input
                type="text"
                name="name"
                value={editItem.name}
                onChange={handleEditInputChange}
                placeholder="Tech Name"
                className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="text-webDescrip font-semibold mt-2 block">
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleEditInputChange}
                accept="image/*"
                className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mt-4">
              <button
                className="text-white text-[16px] px-4 py-2 bg-blue-500 rounded-full  hover:bg-blue-600"
                onClick={handleEditTechStack}
              >
                Update
              </button>
              <button
                className="text-white text-[16px] px-4 py-2 bg-blue-500 rounded-full  hover:bg-blue-600"
                onClick={handleCloseEditModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
