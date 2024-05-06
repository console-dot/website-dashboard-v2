import React, { useState } from "react";
import WhyChooseSection from "../WhyChooseSection/WhyChooseSection";
import { ToastContainer, toast } from "react-toastify";
import { RiLoader3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
// Assuming WhyChooseSection is in a separate file

export default function CustomServicePageEdit() {
  const [formData, setFormData] = useState({
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur recusandae quaerat est et culpa unde perferendis voluptates qui quo laudantium!",
    Proposition:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro?",
    whychooseDesc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    whyChoose: ["ConsoleDot ERP", "SaaS by ConsoleDot", "ConsoleDot MVP"],
    delivers: { actionDesc: "facebook", collabDesc: "youtube" },
  });
  const cardLabels = ["ConsoleDot ERP", "SaaS by ConsoleDot", "ConsoleDot MVP"];
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleWhyChooseChange = (descriptions) => {
    setFormData({
      ...formData,
      whyChoose: descriptions,
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Form submitted", {
        autoClose: 1500, // close after 1.5 seconds
        onClose: () => navigate("/customSoftware"), // navigate after closing
      });
    }, 1500);

    console.log(formData);
    // dispatch(LandingPageEdit(formData));
    // navigate("/landingPage");
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
            value={formData.description}
            placeholder="Custom Service Description"
          />
          <div className="mt-4">
            <label className="text-webDescrip font-semibold">Proposition</label>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="Proposition"
              id="Proposition"
              onChange={handleChange}
              value={formData.Proposition}
              placeholder="Custom Service Proposition"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold">
              Why Choose Description
            </label>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="whychooseDesc"
              id="whychooseDesc"
              onChange={handleChange}
              value={formData.whychooseDesc}
              placeholder="Custom Service Why Choose Description"
            />
          </div>
          <div className="border border-dashed border-custom-purple p-4 mt-6 ">
            <label className="text-webDescrip font-semibol text-[20px] mx-auto">
              Why Choose Us
            </label>
            <WhyChooseSection
              descriptions={formData.whyChoose}
              minCards={3}
              maxCards={3}
              onChange={handleWhyChooseChange}
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
              name="delivers.actionDesc"
              id="actionDesc"
              onChange={handleChange}
              value={formData.delivers.actionDesc}
              placeholder="Expertise in Action"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold">
              Collaborative Ingenuity
            </label>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="delivers.collabDesc"
              id="collabDesc"
              onChange={handleChange}
              value={formData.delivers.collabDesc}
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
