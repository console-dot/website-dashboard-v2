import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RiLoader3Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import {
  selectproductresearchDetails,
  setproductresearchData,
} from "../../redux/productresearchSlice";
import { editproductresearchpage } from "../../api/productresearch";
import WhyChooseUs from "./WhyChooseUs";

const cardLabels = [
  "Holistic Approach",
  "Proven Success",
  "Strategic Partnership",
];

export default function ProductResearchPageEdit() {
  const prData = useSelector(selectproductresearchDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(prData);
  const [whyChooseUs, setWhyChooseUs] = useState(prData.whyChooseUs);
  const [isLoading, setIsLoading] = useState(false);

  const handleWhyChooseUs = (index, event) => {
    const updatedWhyChooseUs = [...whyChooseUs];
    updatedWhyChooseUs[index] = event.target.value;
    setWhyChooseUs(updatedWhyChooseUs);
    setFormData((prevFormData) => ({
      ...prevFormData,
      whyChooseUs: updatedWhyChooseUs,
    }));
  };

  const handleChange = (e, componentIndex, fieldIndex, fieldType) => {
    const newValue = e.target.value;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      const updatedKeyComponents = [...updatedFormData.keyComponents];
      updatedKeyComponents[componentIndex] = {
        ...updatedKeyComponents[componentIndex],
        [fieldType]: [...updatedKeyComponents[componentIndex][fieldType]],
      };
      updatedKeyComponents[componentIndex][fieldType][fieldIndex] = newValue;
      updatedFormData.keyComponents = updatedKeyComponents;
      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedData = await editproductresearchpage(formData, prData._id);
      dispatch(setproductresearchData(updatedData));
      toast.success("Form submitted", {
        autoClose: 1500,
        onClose: () => navigate("/productResearch"),
      });
    } catch (error) {
      console.error("Failed to submit form:", error);
      toast.error("Failed to submit form");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mb-6">
      <form
        className="flex justify-center flex-col w-[50%] m-auto gap-2"
        method="post"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center">
            Product Research Edit
          </h1>
          <label className="text-webDescrip font-semibold">Hero Description</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="heroDescription"
            onChange={(e) =>
              setFormData({ ...formData, heroDescription: e.target.value })
            }
            value={formData.heroDescription}
            placeholder="Hero Description"
          />
          <label className="text-webDescrip font-semibold">Description</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            value={formData.description}
            placeholder="Custom Service Description"
          />
          <div className="border border-dashed border-custom-purple p-4 mt-6">
            <label className="text-webDescrip font-semibold text-[20px] mx-auto text-center">
              Key Points
            </label>
            {formData.keyComponents.map((component, index) => (
              <div key={index}>
                {Object.entries(component).map(
                  ([fieldType, fieldValue]) =>
                    fieldType !== "_id" && (
                      <div key={fieldType}>
                        <label className="text-webDescrip font-semibold">
                          {fieldType.charAt(0).toUpperCase() +
                            fieldType.slice(1).toLowerCase()}
                        </label>
                        <div className="flex gap-2">
                          {Array.isArray(fieldValue) ? (
                            fieldValue.map((field, fieldIndex) => (
                              <textarea
                                key={fieldIndex}
                                className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                name={`${fieldType}${fieldIndex}`}
                                onChange={(e) =>
                                  handleChange(e, index, fieldIndex, fieldType)
                                }
                                value={field}
                                placeholder={`Point ${
                                  fieldIndex + 1
                                } for ${fieldType}`}
                              />
                            ))
                          ) : (
                            <textarea
                              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              type="text"
                              value={fieldValue}
                              disabled
                            />
                          )}
                        </div>
                      </div>
                    )
                )}
              </div>
            ))}
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
        </div>

        <div className="w-full flex justify-center items-center mt-4 mb-4">
          <button
            type="submit"
            className={`text-white text-[16px] w-[300px] h-[48px] px-5 bg-gradient-to-r from-fromclr to-toclr hover:bg-gradient-to-r hover:from-toclr hover:to-fromclr rounded-full flex justify-center items-center focus:outline-none relative`}
          >
            <p className="font-Lato text-base font-medium leading-[28px] tracking-normal">
              Submit
            </p>
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}
