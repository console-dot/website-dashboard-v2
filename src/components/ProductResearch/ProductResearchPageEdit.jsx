import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { RiLoader3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectproductresearchDetails, setproductresearchData } from "../../redux/productresearchSlice";
import { editproductresearchpage } from "../../api/productresearch";
import WhyChooseUs from "./WhyChooseUs";

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

export default function ProductResearchPageEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [whyChooseUs, setWhyChooseUs] = useState([]);
  const productresearchData = useSelector(selectproductresearchDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

// Initialize form data on component mount
useEffect(() => {
  if (productresearchData) {
    setFormData(productresearchData);
    setWhyChooseUs(productresearchData.whyChooseUs || []); // Ensure whyChooseUs is not null
  }
}, [productresearchData]);
console.log(productresearchData, "productresearchData");

 

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    editproductresearchpage(formData, formData._id)
      .then((res) => {
        dispatch(setproductresearchData(res.data));
        setIsLoading(false);
        toast.success("Form submitted", {
          autoClose: 1500,
          onClose: () => navigate("/ai"),
        });
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Failed to submit form");
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center">
            Product Research Edit
          </h1>
          <label className="text-webDescrip font-semibold">Description</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="description"
            onChange={handleChange}
            value={formData.description || ""}
            placeholder="Custom Service Description"
          />
          <div className="border border-dashed border-custom-purple p-4 mt-6">
            <label className="text-webDescrip font-semibold text-[20px] mx-auto text-center">
              Key Points
            </label>
            {/* Key Components */}
            {/* Your key components rendering logic here */}
          </div>
          <div className="border border-dashed border-custom-purple p-4 mt-6">
            <label className="text-webDescrip font-semibold text-[20px] mx-auto">
              Why Choose Us
            </label>
            <WhyChooseUs
              data={whyChooseUs}
              minCards={3}
              maxCards={3}
              onChange={handleWhyChooseUs}
              cardLabels={[
                "Holistic Approach",
                "Proven Success",
                "Strategic Partnership",
              ]}
            />
          </div>
        </div>
        {/* Submit button */}
        <div className="w-full flex justify-center items-center mt-4 mb-4">
          <button
            type="submit"
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
