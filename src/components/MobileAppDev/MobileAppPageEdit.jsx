import React, { useState } from "react";
import WhyChooseUs from "./WhyChooseUs";
import { useNavigate } from "react-router-dom";
import { RiLoader3Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { addTechStack, editTechStack, removeTechStack } from "../../api";
import { addFile } from "../../api/file";
import { selectmobdevDetails, setmobdevData } from "../../redux/mobdevSlice";
import { useDispatch, useSelector } from "react-redux";
import { editMobDevelopment } from "../../api/mobdevelopment";
import RainbowLoader from "../Loader/RainbowLoader";

export default function MobileAppPageEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const mobdevData = useSelector(selectmobdevDetails);
  const [formData, setFormData] = useState(mobdevData);
  const [whyChooseUs, setWhyChooseUs] = useState(mobdevData.whyChooseUs);
  const [selectedFile, setSelectedFile] = useState(null);
  const [techData, setTechData] = useState({
    techStack: {
      name: "",
      type: "",
      image: null,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const cardLabels = [
    "Expertise",
    "Innovative Solutions",
    "Client Collaboration",
    "Customization",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const techIds = formData?.techStack?.map((item) => item._id);
    const newForm = { ...formData, whyChooseUs, techStack: techIds };
    if (mobdevData?._id) {
      editMobDevelopment(newForm, mobdevData?._id)
        .then((res) => {
          console.log("res", res);
          dispatch(setmobdevData(res?.data));
        })
        .catch((err) => console.log(err));

      setTimeout(() => {
        setIsLoading(false);
        toast.success("Form submitted", {
          autoClose: 1500,
          onClose: () => navigate("/mobileApp"),
        });
      }, 1500);
    }
  };

  const handleOpenEditModal = (index) => {
    setEditIndex(index);
    setEditItem(formData.techStack[index]);
    setIsEditModalOpen(true);
  };

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

  const handleWhyChooseChange = (descriptions) => {
    setFormData({
      ...formData,
      whyChoose: descriptions,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setEditItem((prevItem) => ({
        ...prevItem,
        image: file,
      }));
    } else {
      setEditItem((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  };

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
            setTimeout(() => {
              setIsSubmitting(false);
              toast.success("Tech Stack Updated Successfully", {
                autoClose: 500, // close after 1.5 seconds
              });
            }, 500);
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
                  setTimeout(() => {
                    setIsSubmitting(false);
                    toast.success("Tech Stack Updated Successfully", {
                      autoClose: 500, // close after 1.5 seconds
                    });
                  }, 500);
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      }
    }
    handleCloseEditModal();
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditIndex(null);
    setEditItem(null);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddTechStack = () => {
    const newTechStackItem = {
      name: techData.techStack.name,
      type: techData.techStack.type,
      image: techData.techStack.image,
    };

    if (selectedFile) {
      setIsSubmitting(true);
      addFile(selectedFile)
        .then((res) => {
          if (res?.status == 201) {
            newTechStackItem.image = res?.data;
            addTechStack(newTechStackItem)
              .then((res) => {
                console.log("res", res);
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  techStack: [...prevFormData.techStack, res?.data],
                }));
                setTimeout(() => {
                  setIsSubmitting(false);
                  toast.success("Tech Stack Added Successfully", {
                    autoClose: 500, // close after 1.5 seconds
                  });
                }, 500);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      setTimeout(() => {
        setIsLoading(false);
        toast.warning("Please fill out all fields including image", {
          autoClose: 500, // close after 1.5 seconds
        });
      }, 500);
    }
    // Close Modal
    closeModal();
  };
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const updatedTechStack = [...formData.techStack];
    updatedTechStack[index]["img"] = URL.createObjectURL(file);
    setFormData({
      ...formData,
      techStack: updatedTechStack,
    });
  };

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
            Mobile App Development Edit
          </h1>
          <label className="text-webDescrip font-semibold">
            Hero Description
          </label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="heroDescription"
            id="heroDescription"
            onChange={handleChange}
            value={formData.heroDescription}
            placeholder="Hero Description"
          />
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
          <label className="text-webDescrip font-semibold">Proposition</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="proposition"
            id="proposition"
            onChange={handleChange}
            value={formData.proposition}
            placeholder="Custom Service Proposition"
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

            <div className="w-full text-webDescrip font-semibold">Frontend</div>
            {formData?.techStack?.map((item, index) =>
              item?.type === "Frontend" ? (
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
            <div className="w-full text-webDescrip font-semibold">Backend</div>
            {formData?.techStack?.map((item, index) =>
              item?.type === "Backend" ? (
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
            <div className="w-full text-webDescrip font-semibold">Database</div>
            {formData?.techStack?.map((item, index) =>
              item?.type === "Database" ? (
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
              Cloud Services
            </div>
            {formData?.techStack?.map((item, index) =>
              item?.type === "Cloud Services" ? (
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
              Version Control System
            </div>
            {formData?.techStack?.map((item, index) =>
              item?.type === "VCS" ? (
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
            {/* Testing */}
            <div className="w-full text-webDescrip font-semibold">API</div>
            {formData?.techStack?.map((item, index) =>
              item?.type === "Api" ? (
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
                  <option value="Frontend">Frontend Technologies</option>
                  <option value="Backend">Backend Technologies</option>
                  <option value="Database">Database</option>
                  <option value="Cloud Services">Cloud Services</option>
                  <option value="VCS">Version Control Systems</option>
                  <option value="Api">API</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="text-webDescrip font-semibold mt-2 block">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="img"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2 justify-center">
              <button
                className="text-white btn btn-accent btn-sm opacity-70 hover:opacity-100"
                onClick={handleAddTechStack}
              >
                Save
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="text-white btn btn-error btn-sm opacity-70 hover:opacity-100"
              >
                Close
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
            <div className="mt-4 flex gap-2 justify-center">
              <button
                className="text-white btn btn-accent btn-sm opacity-70 hover:opacity-100"
                onClick={handleEditTechStack}
              >
                Update
              </button>
              <button
                className="text-white btn btn-error btn-sm opacity-70 hover:opacity-100"
                onClick={handleCloseEditModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isSubmitting && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
          <RainbowLoader />
        </div>
      )}
    </div>
  );
}
