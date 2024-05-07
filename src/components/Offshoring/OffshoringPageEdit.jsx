import { useState } from "react";
import { Button } from "../Button";
import { FaEdit, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { RiLoader3Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function OffshoringPageEdit() {
  // Form data state
  const [formData, setFormData] = useState({
    topDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolorem veniam beatae laborum deserunt fugit repellat qui animi quas earum!",
    bottomDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolorem veniam beatae laborum deserunt fugit repellat qui animi quas earum!",

    offShoreType: [
      {
        name: "hourly",
        description:
          "Hourly offshore type involves paying workers based on the number of hours worked.",
        advantages: [
          "Flexibility in adjusting workload and hours.",
          "Transparent billing based on actual work hours.",
          "Easier to track progress and productivity.",
        ],
        comparison: [
          "May be more expensive if hours are not managed efficiently.",
          "Requires effective time tracking systems.",
          "Limited cost predictability compared to fixed-price models.",
          "Can lead to disputes over billed hours.",
          "Not suitable for projects with well-defined scope and timeline.",
          "May incentivize longer hours rather than efficiency.",
        ],
      },
      {
        name: "fixed",
        description:
          "Fixed offshore type involves agreeing on a set price for a project or specific tasks.",
        advantages: [
          "Predictable costs for budgeting and planning.",
          "Clear scope and deliverables defined upfront.",
          "Lower risk for budget overruns.",
        ],
        comparison: [
          "Less flexibility for changes or additional work.",
          "Risk of underestimating project scope and costs.",
          "Requires thorough initial planning and requirements gathering.",
          "May lead to disputes if scope changes are not managed effectively.",
          "Can be challenging to accommodate unforeseen issues or changes.",
          "Less suitable for projects with evolving requirements.",
        ],
      },
      {
        name: "bot",
        description:
          "Bot offshore type involves leveraging automation and AI-driven bots to perform tasks.",
        advantages: [
          "High speed and efficiency in task execution.",
          "24/7 availability for repetitive tasks.",
          "Reduced error rates compared to human counterparts.",
        ],
        comparison: [
          "Initial investment required for bot development and integration.",
          "May not be suitable for tasks requiring nuanced human judgment.",
          "Limited capability for handling complex or unstructured tasks.",
          "Requires ongoing maintenance and updates for optimal performance.",
          "Potential job displacement concerns.",
          "Not applicable for tasks requiring creativity or empathy.",
        ],
      },
    ],
  });

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Navigation
  const navigate = useNavigate();

  // Modal states and functions
  const [isModalOpenAdvantage, setIsModalOpenAdvantage] = useState(false);
  const [isModalOpenComparison, setIsModalOpenComparison] = useState(null);
  const [advantageInput, setAdvantageInput] = useState("");
  const [comparisonInput, setComparisonInput] = useState("");
  const [editingAdvantageIndex, setEditingAdvantageIndex] = useState(null);
  const [editingComparisonIndex, setEditingComparisonIndex] = useState(null);

  const [modalIndex, setModalIndex] = useState(null);

  const openModalAdvantage = (index) => {
    setIsModalOpenAdvantage(true);
    setModalIndex(index);
  };

  // Function to open modal for adding/editing comparisons
  const openModalComparison = (index) => {
    setIsModalOpenComparison(true);
    setModalIndex(index);
  };

  // Function to handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Form submitted", {
        autoClose: 1500,
        onClose: () => navigate("/offShoring"),
      });
    }, 1500);

    if (!isModalOpenAdvantage && !isModalOpenComparison) {
      console.log(formData);
    }
  };

  // Function to handle description change
  const handleDescriptionChange = (newValue, index) => {
    setFormData((prevData) => {
      const updatedOffShoreType = [...prevData.offShoreType];
      updatedOffShoreType[index].description = newValue;
      return { ...prevData, offShoreType: updatedOffShoreType };
    });
  };

  // Function to edit an advantage
  const editAdvantage = (typeIndex, advantageIndex) => {
    const currentAdvantage =
      formData.offShoreType[typeIndex].advantages[advantageIndex];
    setAdvantageInput(currentAdvantage);
    // Open the modal for editing advantages
    setIsModalOpenAdvantage(true);
    // Update state with the index for editing
    setEditingAdvantageIndex({ typeIndex, advantageIndex });
  };

  // Function to edit a comparison
  const editComparison = (typeIndex, comparisonIndex) => {
    const currentComparison =
      formData.offShoreType[typeIndex].comparison[comparisonIndex];
    setComparisonInput(currentComparison);
    // Open the modal for editing comparisons
    setIsModalOpenComparison(true);
    // Update state with the index for editing
    setEditingComparisonIndex({ typeIndex, comparisonIndex });
  };

  // Functions to add and remove advantages
  const addAdvantage = () => {
    if (advantageInput.trim() !== "") {
      const { typeIndex, advantageIndex } = editingAdvantageIndex;
      const updatedOffShoreType = [...formData.offShoreType];
      updatedOffShoreType[typeIndex].advantages[advantageIndex] =
        advantageInput;
      setFormData((prevData) => ({
        ...prevData,
        offShoreType: updatedOffShoreType,
      }));
      setAdvantageInput("");
      setIsModalOpenAdvantage(false); // Close modal after editing
    }
  };

  // Functions to add and remove comparisons
  const addComparison = () => {
    if (comparisonInput.trim() !== "") {
      const { typeIndex, comparisonIndex } = editingComparisonIndex;
      const updatedOffShoreType = [...formData.offShoreType];
      updatedOffShoreType[typeIndex].comparison[comparisonIndex] =
        comparisonInput;
      setFormData((prevData) => ({
        ...prevData,
        offShoreType: updatedOffShoreType,
      }));
      setComparisonInput("");
      setIsModalOpenComparison(false); // Close modal after editing
    }
  };

  // Function to remove an advantage
  const removeAdvantage = (typeIndex, advantageIndex) => {
    const updatedOffShoreType = [...formData.offShoreType];
    updatedOffShoreType[typeIndex].advantages.splice(advantageIndex, 1);
    setFormData((prevData) => ({
      ...prevData,
      offShoreType: updatedOffShoreType,
    }));
  };

  // Function to remove a comparison
  const removeComparison = (typeIndex, comparisonIndex) => {
    const updatedOffShoreType = [...formData.offShoreType];
    updatedOffShoreType[typeIndex].comparison.splice(comparisonIndex, 1);
    setFormData((prevData) => ({
      ...prevData,
      offShoreType: updatedOffShoreType,
    }));
  };

  return (
    <div className="w-full">
      <form
        className="flex justify-center flex-col w-[50%] m-auto gap-2"
        method="post"
        onSubmit={handleSubmit}
      >
        {/* offshore start */}
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            Offshore Edit
          </h1>
          <label className="text-webDescrip font-semibold">
            Top Description
          </label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="offshoreType"
            id="offshoreType"
            onChange={handleChange}
            value={formData?.topDescription}
            placeholder="Offshore Type"
          />
          <label className="text-webDescrip font-semibold">
            Bottom Description
          </label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="offshoreType"
            id="offshoreType"
            onChange={handleChange}
            value={formData?.bottomDescription}
            placeholder="Offshore Type"
          />
          <div className="mt-4">
            {formData.offShoreType.map((type, index) => (
              <div
                key={index}
                className="border border-dashed border-custom-purple rounded-lg p-4 mt-4"
              >
                <h2 className="text-lg font-semibold">{type.name}</h2>
                <div className="mt-2">
                  <label className="text-webDescrip font-semibold">
                    Description
                  </label>
                  <textarea
                    className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={type.description}
                    onChange={(e) =>
                      handleDescriptionChange(e.target.value, index)
                    }
                    placeholder="Offshore Description"
                  />
                </div>
                <div className="mt-4">
                <div className="flex flex-row justify-between items-center mb-2">
                    <label className="text-webDescrip font-semibold">
                      Comparison
                    </label>
                    <div className="flex flex-row  items-center">
                      <button
                        type="button"
                        className="text-white btn btn-success flex items-center space-x-1"
                      >
                        <FaPlus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="w-full flex flex-col justify-start border border-dashed border-custom-purple rounded-lg p-4">
                    {type.advantages.map((advantage, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2"
                      >
                        <p className="text-webDescrip">{advantage}</p>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => editAdvantage(index, idx)}
                            className="text-success mr-2"
                          >
                            <FaPen />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeAdvantage(index, idx)}
                            className="text-error"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-row justify-between items-center mb-2">
                    <label className="text-webDescrip font-semibold">
                      Comparison
                    </label>
                    <div className="flex flex-row  items-center">
                      <button
                        type="button"
                        className="text-white btn btn-success flex items-center space-x-1"
                      >
                        <FaPlus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>

                  <div className="w-full flex flex-col justify-start  border border-dashed border-custom-purple rounded-lg p-4">
                    {type.comparison.map((comparison, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2"
                      >
                        <p className="text-webDescrip">{comparison}</p>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => editComparison(index, idx)}
                            className="text-success mr-2"
                          >
                            <FaPen />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeComparison(index, idx)}
                            className="text-error"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* offshore end */}

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
      // For Advantage Modal
      {isModalOpenAdvantage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white w-[40%] h-[20%] flex flex-col justify-center p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Edit Advantage</h2>
            <input
              type="text"
              value={advantageInput}
              onChange={(e) => setAdvantageInput(e.target.value)}
              className="bg-white border border-custom-purple text-webDescrip p-2 w-full mb-2 h-24"
              placeholder="Enter advantage"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addAdvantage}
                className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpenAdvantage(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      // For Comparison Modal
      {isModalOpenComparison !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white w-[40%] h-[20%] flex flex-col justify-center p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">
              {isModalOpenComparison === "add"
                ? "Add Comparison"
                : "Edit Comparison"}
            </h2>
            <input
              type="text"
              value={comparisonInput}
              onChange={(e) => setComparisonInput(e.target.value)}
              className="bg-white border border-custom-purple text-webDescrip p-2 w-full mb-2 h-24"
              placeholder="Enter comparison"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => addComparison()}
                className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-blue-600"
              >
                {isModalOpenComparison === "add" ? "Add" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpenComparison(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
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
