import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RiLoader3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCaseStudiesDetails,
  setCaseStudiesData,
} from "../../redux/caseStudiesSlice";
import { addCaseStudy, editcaseStudies } from "../../api";
import config from "../../api/config";
import { RxCross1 } from "react-icons/rx";
import { addFile } from "../../api/file";

export default function CaseStudiesPageAdd() {
  const BASE_URL = config.BASE_URL;
  const caseStudiesData = useSelector(selectCaseStudiesDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    projectImage: null,
    clientName: "",
    services: "",
    projectDuration: "",
    images: [],
    description: "",
    tech: [],
  });
  const [newTech, setNewTech] = useState("");
  const [newImages, setNewImages] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsLoading(true);
    console.log("data", formData);
    addCaseStudy(formData)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Form submitted", {
        autoClose: 1500, // close after 1.5 seconds
        onClose: () => navigate("/casestudies"), // navigate after closing
      });
    }, 1500);
  };

  // Handle form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const newImage = e.target.files[0];
    addFile(newImage)
      .then((res) => {
        // console.log("res", res);
        if (res?.status == 201) {
          setFormData((prevData) => ({
            ...prevData,
            images: [...(prevData.images || []), res?.data],
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  // Handle remove tech
  const handleRemoveProjectSnippets = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  // Handle file change
  const handleProjectImage = (e) => {
    const newImage = e.target.files[0];
    addFile(newImage)
      .then((res) => {
        if (res?.status == 201) {
          setFormData((prevData) => ({
            ...prevData,
            projectImage: res?.data,
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  // Handle remove tech
  const handleRemoveProjectImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      projectImage: null,
    }));
  };

  // Handle new tech input change
  const handleNewTechChange = (e) => {
    setNewTech(e.target.value);
  };

  // Handle add tech
  const handleAddTech = () => {
    if (newTech.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        tech: [...prevData.tech, newTech],
      }));
      setNewTech("");
    }
  };

  // Handle remove tech
  const handleRemoveTech = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      tech: prevData.tech.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="w-full mb-6">
      <form
        className="flex justify-center flex-col w-[50%] m-auto gap-2"
        method="post"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            Case Study Edit
          </h1>
          <label className="text-webDescrip font-semibold">Title</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={formData?.title}
            placeholder="Case Study Title"
          />
          <label className="text-webDescrip font-semibold mt-4">
            Client Name
          </label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="clientName"
            id="clientName"
            onChange={handleChange}
            value={formData?.clientName}
            placeholder="Client Name"
          />
          <label className="text-webDescrip font-semibold mt-4">
            Description
          </label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="description"
            id="description"
            onChange={handleChange}
            value={formData?.description}
            placeholder="Case Study Description"
          />
          <label className="text-webDescrip font-semibold mt-4">
            Project Duration
          </label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="projectDuration"
            id="projectDuration"
            onChange={handleChange}
            value={formData?.projectDuration}
            placeholder="Project Duration"
          />
          <label className="text-webDescrip font-semibold mt-4">Services</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="services"
            id="services"
            onChange={handleChange}
            value={formData?.services}
            placeholder="Services"
          />
          <label className="text-webDescrip font-semibold mt-4">Tech</label>
          <div className="flex items-center">
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="newTech"
              id="newTech"
              onChange={handleNewTechChange}
              value={newTech}
              placeholder="Add Tech"
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
            >
              Add
            </button>
          </div>
          <div className="flex mt-2">
            {formData.tech.map((techItem, index) => (
              <div key={index} className="flex items-center">
                <div className="flex justify-center items-center gap-2 bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2">
                  <span>{techItem}</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleRemoveTech(index)}
                  >
                    <RxCross1 />
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Project Image */}
          <label className="text-webDescrip font-semibold mt-4">
            Project Image
          </label>
          <div className="flex justify-center gap-6 w-full mt-4">
            {formData?.projectImage ? (
              <div className="flex">
                <img
                  src={`${BASE_URL}/file/${formData?.projectImage}`}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
                <span
                  className="cursor-pointer"
                  onClick={() => handleRemoveProjectImage()}
                >
                  <RxCross1 />
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleProjectImage}
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {/* Project Snippets */}
          <label className="text-webDescrip font-semibold mt-4">
            Project Snippets
          </label>
          <div className="flex justify-center gap-6 w-full mt-4">
            {formData?.images?.map((image, index) => (
              <div className="flex" key={index}>
                <img
                  src={
                    image.startsWith("blob:")
                      ? image
                      : `${BASE_URL}/file/${image}`
                  }
                  alt={`${formData.title} snippet ${index + 1}`}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
                <span
                  className="cursor-pointer"
                  onClick={() => handleRemoveProjectSnippets(index)}
                >
                  <RxCross1 />
                </span>
              </div>
            ))}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
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
    </div>
  );
}
