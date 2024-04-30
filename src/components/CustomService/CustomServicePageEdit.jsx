import React, { useState } from "react";
import WhyChooseSection from "../WhyChooseSection/WhyChooseSection";
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
  const cardLabels = [
    "ConsoleDot ERP",
    "SaaS by ConsoleDot",
    "ConsoleDot MVP"
  ];
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
            Custom Service Model
          </h1>
          <label className="text-webDescrip font-semibold">Description</label>
          <input
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
            name="Proposition"
            id="Proposition"
            onChange={handleChange}
            value={formData.Proposition}
            placeholder="Custom Service Proposition"
          />
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

        {/* Submit button */}
        <div className="w-full flex justify-center items-center mt-4">
          <button
            type="submit"
            className="text-white text-[16px] w-[300px] px-5 py-2.5 bg-gradient-to-r from-fromclr to-toclr hover:bg-gradient-to-r hover:from-toclr hover:to-fromclr rounded-full focus:outline-none active:bg-gradient-to-r active:from-custom-purple active:to-custom-blue"
          >
            <p className="font-Lato text-base font-medium leading-[28px] tracking-normal">
              Submit
            </p>
          </button>
        </div>
      </form>
    </div>
  );
}
