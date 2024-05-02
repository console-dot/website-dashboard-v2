import React, { useState } from "react";
import WhyChooseSection from "../WhyChooseSection/WhyChooseSection";
import { TechStack } from "../TechStack/TechStack";
// Assuming WhyChooseSection is in a separate file

export default function ArVrPageEdit() {
  const [formData, setFormData] = useState({
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur recusandae quaerat est et culpa unde perferendis voluptates qui quo laudantium!",

    whyChoose: [
      "Expertise in Immersive Technology",
      "Innovation-Driven Solutions",
      "Client-Centric Collaboration",
      "Tailored Experiences",
    ],
    techStack: [
      { name: "React", type: "Frontend", img: "react.png" },
      { name: "Node.js", type: "Backend", img: "nodejs.png" },
    ],
  });
  const cardLabels = [
    "Expertise in Immersive Technology",
    "Innovation-Driven Solutions",
    "Client-Centric Collaboration",
    "Tailored Experiences",
  ];
  const handleWhyChooseChange = (descriptions) => {
    setFormData({
      ...formData,
      whyChoose: descriptions,
    });
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTechStack = [...formData.techStack];
    updatedTechStack[index][name] = value;
    setFormData({
      ...formData,
      techStack: updatedTechStack,
    });
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
  const handleAddTechStack = () => {
    setFormData({
      ...formData,
      techStack: [...formData.techStack, { name: "", type: "", img: "" }],
    });
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
        {/* ArVr Edit */}
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            Ar/Vr Edit
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
            <WhyChooseSection
              descriptions={formData.whyChoose}
              minCards={3}
              maxCards={4}
              onChange={handleWhyChooseChange}
              cardLabels={cardLabels}
            />
          </div>

          {/* Tech Stack */}
          <TechStack
            techStack={formData.techStack}
            onChange={handleChange}
            onImageChange={handleImageChange}
            onAddTechStack={handleAddTechStack}
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
