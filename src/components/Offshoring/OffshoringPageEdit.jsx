import { useState } from "react";
import { Button } from "../Button";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function OffshoringPageEdit() {
  //   modal start

  // Modal state
  const [isModalOpenAdvantage, setIsModalOpenAdvantage] = useState(false);
  const [isModalOpenComparison, setIsModalOpenComparison] = useState(false);
  const [advantageInput, setAdvantageInput] = useState("");
  const [comparisonInput, setComparisonInput] = useState("");

  // Modal functions
  const openModalAdvantage = () => setIsModalOpenAdvantage(true);
  const closeModalAdvantage = () => setIsModalOpenAdvantage(false);
  const openModalComparison = () => setIsModalOpenComparison(true);
  const closeModalComparison = () => setIsModalOpenComparison(false);

  const addAdvantage = () => {
    if (advantageInput.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        offshoreAdvantages: [...prevData.offshoreAdvantages, advantageInput],
      }));
      setAdvantageInput("");
    }
  };

  const removeAdvantage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      offshoreAdvantages: prevData.offshoreAdvantages.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const addComparison = () => {
    if (comparisonInput.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        offshoreComparison: [...prevData.offshoreComparison, comparisonInput],
      }));
      setComparisonInput("");
    }
  };

  const removeComparison = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      offshoreComparison: prevData.offshoreComparison.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // modal end

  const [formData, setFormData] = useState({
    offshoreType: "Dedicated Development Center",
    offshoreDescription:
      "Offers flexible engagement models and full control over the process.",
    offshoreAdvantages: [
      "Cost Effective",
      "Scalable Resources",
      "Expert Teams",
    ],
    offshoreComparison: [
      "Dedicated Team",
      "Freelance",
      "Better Collaboration",
      "Consistency",
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isModalOpenAdvantage && !isModalOpenComparison) {
      console.log(formData);
    }
    // dispatch(LandingPageEdit(formData));

    // navigate("/landingPage");
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
          <label className="text-webDescrip font-semibold">Offshore Type</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="offshoreType"
            id="offshoreType"
            onChange={handleChange}
            value={formData?.offshoreType}
            placeholder="Offshore Type"
          />
          <div className="mt-4">
            <label className="text-webDescrip font-semibold">
              Offshore Description
            </label>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="offshoreDescription"
              id="offshoreDescription"
              onChange={handleChange}
              value={formData?.offshoreDescription}
              placeholder="Offshore Description"
            />
          </div>
          <div className="mt-4">
            <label className="text-webDescrip font-semibold">
              Offshore Advantages
            </label>
            <div className="w-full flex flex-col justify-start items-center border border-dashed border-custom-purple rounded-lg p-4">
              <div className="w-full flex gap-2 justify-between mb-4 flex-col ">
                {formData.offshoreAdvantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2"
                  >
                    <p className="text-webDescrip">{advantage}</p>
                    <button
                      type="button"
                      onClick={() => removeAdvantage(index)}
                      className="btn btn-error  text-white  rounded-xl"
                    >
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="w-[100%] flex justify-center items-center ">
                <Button
                  text={"Add Advantage"}
                  icon={<FaPlus />}
                  click={openModalAdvantage}
                />
              </div>
            </div>
          </div>
          {/* Remaining form fields */}

          {/* Modal */}
          {isModalOpenAdvantage && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
              <div className="bg-white w-[40%] h-[30%] felx justify-center p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Add Advantage</h2>
                <textarea
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
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={closeModalAdvantage}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {/*  */}
          <div className="mt-4">
          <label className="text-webDescrip font-semibold">
            Offshore Comparison
          </label>
          <div className="w-full flex flex-col justify-start items-center border border-dashed border-custom-purple rounded-lg p-4">
            <div className="w-full flex gap-2 justify-between mb-4 flex-col ">
              {formData.offshoreComparison.map((Comaprison, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2"
                >
                  <p className="text-webDescrip">{Comaprison}</p>
                  <button
                    type="button"
                    onClick={() => removeComparison(index)}
                    className="btn btn-error  text-white  rounded-xl"
                  >
                    <FaTrash />
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="w-[100%] flex justify-center items-center ">
              <Button
                text={"Add Comparison"}
                icon={<FaPlus />}
                click={openModalComparison}
              />
            </div>
          </div>

          {/* Remaining form fields */}

          {/* Modal */}
          {isModalOpenComparison && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
              <div className="bg-white w-[40%] h-[30%] felx justify-center p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Add Comparison</h2>
                <textarea
                  type="text"
                  value={comparisonInput}
                  onChange={(e) => setComparisonInput(e.target.value)}
                  className="bg-white border border-custom-purple text-webDescrip p-2 w-full mb-2 h-24"
                  placeholder="Enter comparison"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={addComparison}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-blue-600"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={closeModalComparison}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
        {/* offshore end */}

        <div className="w-full flex justify-center items-center mt-4 mb-4">
          <button className="text-white text-[16px] w-[300px] px-5 py-2.5 bg-gradient-to-r from-fromclr to-toclr hover:bg-gradient-to-r hover:from-toclr hover:to-fromclr rounded-full focus:outline-none active:bg-gradient-to-r active:from-custom-purple active:to-custom-blue">
            <p className="font-Lato text-base font-medium leading-[28px] tracking-normal">
              Submit
            </p>
          </button>
        </div>
      </form>
    </div>
  );
}
