import React, { useState } from "react";
import WhyChooseSection from "../WhyChooseSection/WhyChooseSection";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RiLoader3Line } from "react-icons/ri";

// Define modal styles
const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const cardLabels = [
    "Holistic Approach",
    "Proven Success",
    "Strategic Partnership"
  ];

export default function ProductResearchPageEdit() {
  const [formData, setFormData] = useState({
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur recusandae quaerat est et culpa unde perferendis voluptates qui quo laudantium!",
    keyComponents: [
      { heading: "Market Analysis", points: ["", ""] },
      { heading: "Client", points: ["", ""] },
      { heading: "Feasibility", points: ["", ""] },
      { heading: "Road Map", points: ["", ""] },
    ],
    whyChoose: ["Holistic Approach", "Proven Success", "Strategic Partnership"],
  });

  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(null);
  const [currentPointIndex, setCurrentPointIndex] = useState(null);

  const handleChange = (e, index, pointIndex) => {
    const { value } = e.target;
    const keyComponents = [...formData.keyComponents];
    keyComponents[index].points[pointIndex] = value;
    setFormData({
      ...formData,
      keyComponents: keyComponents,
    });
  };

  const openModal = (index, pointIndex) => {
    setCurrentComponentIndex(index);
    setCurrentPointIndex(pointIndex);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Form submitted", {
        autoClose: 1500, // close after 1.5 seconds
        onClose: () => navigate("/productResearch"), // navigate after closing
      });
    }, 1500);

    console.log(formData);
    // Dispatch or handle form submission logic here
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
            Product Research Edit
          </h1>
          {/* Description */}
          <label className="text-webDescrip font-semibold">Description</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="description"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            value={formData.description}
            placeholder="Custom Service Description"
          />
          {/* Key Components */}
          <div className="border border-dashed border-custom-purple p-4 mt-6 ">
            <label className="text-webDescrip font-semibold text-[20px] mx-auto text-center ">
              Key Points 
            </label>
          {formData.keyComponents.map((component, index) => (
              <div key={index} >
                <div className="mt-4">
              <label className="text-webDescrip font-semibold">
                {component.heading}
              </label>
              <div className="flex gap-2 ">
                <textarea
                  className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="point1"
                  onChange={(e) => handleChange(e, index, 0)}
                  value={component.points[0]}
                  placeholder={`Point 1 for ${component.heading}`}
                  disabled
                  />
                <textarea
                  className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="point2"
                  onChange={(e) => handleChange(e, index, 1)}
                  value={component.points[1]}
                  placeholder={`Point 2 for ${component.heading}`}
                  disabled
                />
              </div>
              </div>
              <div className="flex justify-between ">
                <button className="text-sm bg-green-700  py-1 px-[20px]  text-white" onClick={() => openModal(index, 0)}>Edit </button>
                <button className="text-sm bg-green-700  py-1 px-[20px]  text-white" onClick={() => openModal(index, 1)}>Edit </button>
              </div>
            </div>
          ))}
          </div>
          {/* Why Choose Section */}
          <div className="border border-dashed border-custom-purple p-4 ">
            <label className="text-webDescrip font-semibold text-[20px] mx-auto">
              Why Choose Us
            </label>
            <WhyChooseSection
              descriptions={formData.whyChoose}
              minCards={3}
              maxCards={3}
              onChange={(descriptions) => setFormData({ ...formData, whyChoose: descriptions })}
              cardLabels={cardLabels}
            />
          </div>
        </div>

        {/* Modal for editing points */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
          contentLabel="Edit Point Modal"
        >

          <div className="flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold">Edit Point</h2>
            <textarea
              type="text"
              className="w-full bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formData.keyComponents[currentComponentIndex]?.points[currentPointIndex]}
              onChange={(e) => handleChange(e, currentComponentIndex, currentPointIndex)}
            />
            <button className="text-sm text-red-600 mt-2" onClick={closeModal}>Close</button>
          </div>
        </Modal>

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
