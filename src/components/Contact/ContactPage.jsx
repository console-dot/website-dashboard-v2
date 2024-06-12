import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { editHeroDescription, getHeroDescription } from "../../api";
import { setHeroDescriptionData } from "../../redux";

export const ContactPage = () => {
  const dispatch = useDispatch();
  const [heroData, setHeroData] = useState(null);
  const [contactHero, setContactHero] = useState("");

  // Fetch hero description data
  useEffect(() => {
    getHeroDescription()
      .then((res) => {
        setHeroData(res?.data);
        dispatch(setHeroDescriptionData(res?.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    setContactHero(heroData?.contactHero || "");
  }, [heroData]);

  const handleHeroDescription = async (e) => {
    e.preventDefault();
    try {
      const res = await editHeroDescription({ contactHero }, heroData._id);
      setContactHero(res?.contactHero);
      alert("Hero description updated successfully!");
    } catch (err) {
      alert("Failed to update hero description");
    }
  };

  return (
    <>
      <div className="flex flex-row w-[90%] m-auto justify-start items-center">
        <h2 className="text-black text-2xl font-bold">Contact Us</h2>
      </div>
      {/* Display contact */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex flex-col w-full">
          {/* Hero description */}
          <div className="flex flex-col" style={{ width: "70%" }}>
            <label className="" style={{ color: "grey" }}>
              Hero Description
            </label>
            <div className="flex flex-row gap-2">
              <textarea
                className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="contactHero"
                id="contactHero"
                onChange={(e) => setContactHero(e.target.value)}
                value={contactHero}
                placeholder="Hero Description"
              />
              <button
                className="bg-blue-500 text-white py-1 px-6 rounded-lg"
                type="button"
                onClick={handleHeroDescription}
              >
                Update
              </button>
            </div>
            <div className="border-b border-solid border-custom-purple mt-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};
