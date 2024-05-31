import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RiLoader3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCaseStudiesDetails,
  setCaseStudiesData,
} from "../../redux/caseStudiesSlice";
import { editcaseStudies } from "../../api";
import config from "../../api/config";

export default function CaseStudiesPageEdit() {
  const BASE_URL = config.BASE_URL;
  const caseStudiesData = useSelector(selectCaseStudiesDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [newImages, setNewImages] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (caseStudiesData) {
      setFormData(caseStudiesData);
    }
  }, [caseStudiesData]);

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (caseStudiesData) {
      const dataToSubmit = { ...formData, newImages };
      editcaseStudies(dataToSubmit)
        .then((res) => {
          dispatch(setCaseStudiesData(res?.data));
        })
        .catch((err) => console.log(err));

      // Timeout
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Form submitted", {
          autoClose: 1500, // close after 1.5 seconds
          onClose: () => navigate("/caseStudies"), // navigate after closing
        });
      }, 1500);
    }
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
    const files = Array.from(e.target.files);
    setNewImages(files);

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setFormData((prevData) => ({
      ...prevData,
      images: [...(prevData.images || []), ...filePreviews],
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
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="tech"
            id="tech"
            onChange={handleChange}
            value={formData?.tech}
            placeholder="Tech"
          />
          <label className="text-webDescrip font-semibold mt-4">
            Project Snippets
          </label>
          <div className="flex justify-center gap-6 w-full mt-4">
            {formData?.images?.map((image, index) => (
              <div key={index}>
                <img
                  src={
                    image.startsWith("blob:")
                      ? image
                      : `${BASE_URL}/file/${image}`
                  }
                  alt={`${formData.title} snippet ${index + 1}`}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </div>
            ))}
          </div>
          <label className="text-webDescrip font-semibold mt-4">
            Upload New Images
          </label>
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
