import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RiLoader3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  selectCustomServiceDetails,
  setCustomServiceData,
} from "../../redux/customServiceSlice";
import { useDispatch, useSelector } from "react-redux";
import WhyChooseUs from "./WhyChooseUs";
import { editCustomService } from "../../api/customservice";

export default function CustomServicePageEdit() {
  const customSData = useSelector(selectCustomServiceDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(customSData);
  const [whyChooseUs, setWhyChooseUs] = useState(customSData.whyChooseUs);
  const cardLabels = ["ConsoleDot ERP", "SaaS by ConsoleDot", "ConsoleDot MVP"];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newForm = {
      delivers: formData?.delivers,
      description: formData?.description,
      proposition: formData?.proposition,
      whyChooseDes: formData?.whyChooseDes,
      whyChooseUs: whyChooseUs,
    };

    if (customSData?._id) {
      editCustomService(newForm, customSData?._id)
        .then((res) => {
          console.log("res", res);
          dispatch(setCustomServiceData(res?.data));
        })
        .catch((err) => console.log(err));
      // Timeout
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Form submitted", {
          autoClose: 1500, // close after 1.5 seconds
          onClose: () => navigate("/customSoftware"), // navigate after closing
        });
      }, 1500);
    }
  };

  // Handle form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("delivers.")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        delivers: {
          ...formData.delivers,
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
            Custom Service Edit
          </h1>
          <label className="text-webDescrip font-semibold">Description</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            value={formData?.description}
            placeholder="Custom Service Description"
          />
          <div className="mt-4">
            <label className="text-webDescrip font-semibold">Proposition</label>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="proposition"
              id="proposition"
              onChange={handleChange}
              value={formData?.proposition}
              placeholder="Custom Service Proposition"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold">
              Why Choose Description
            </label>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="whyChooseDes"
              id="whyChooseDes"
              onChange={handleChange}
              value={formData?.whyChooseDes}
              placeholder="Custom Service Why Choose Description"
            />
          </div>
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
          <div className="mt-6">
            <label className="text-webDescrip text-[20px] font-bold">
              Delivers
            </label>
          </div>
          <div className="">
            <label className="text-webDescrip font-semibold">
              Expertise in Action
            </label>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="delivers.actionDescription"
              id="actionDesc"
              onChange={handleChange}
              value={formData?.delivers?.actionDescription}
              placeholder="Expertise in Action"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold">
              Collaborative Ingenuity
            </label>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="delivers.collabDescription"
              id="collabDesc"
              onChange={handleChange}
              value={formData?.delivers?.collabDescription}
              placeholder="Collaborative Ingenuity"
            />
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
    </div>
  );
}
