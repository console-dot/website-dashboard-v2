import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editHeroDescription,
  getHeroDescription,
  getcaseStudiespage,
} from "../../api";
import {
  selectCaseStudiesDetails,
  setCaseStudiesData,
  setHeroDescriptionData,
} from "../../redux";
import { CaseStudiesCard } from "./CaseStudiesCard";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

export const CaseStudiesPage = ({ setIsValid, isValid }) => {
  const [data, setData] = useState(null);
  const [heroData, setHeroData] = useState(null);
  const [caseStudyHero, setCaseStudyHero] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const caseStudies = useSelector(selectCaseStudiesDetails);
    // Navigate to view case study
    const onView = (id) => {
      navigate(`view/${id}`);
    };
  

  // Fetch case studies data
  useEffect(() => {
    getcaseStudiespage()
      .then((res) => {
        if (res == 403) {
          setIsValid(false);
        }
        setData(res?.data);
        dispatch(setCaseStudiesData(res?.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    console.log("isValid", isValid);
    if (!isValid) {
      toast.warning("You Session has been Expired. Please Login Again", {
        autoClose: 1500,
        onClose: () => {},
      });
    }
  }, [location.pathname, isValid]);


  useEffect(() => {
    setData(caseStudies);
  }, [caseStudies]);

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
    setCaseStudyHero(heroData?.caseStudyHero || "");
  }, [heroData]);

  const handleHeroDescription = async (e) => {
    e.preventDefault();
    try {
      const res = await editHeroDescription({ caseStudyHero }, heroData._id);
      setCaseStudyHero(res?.caseStudyHero);
      alert("Hero description updated successfully!");
    } catch (err) {
      alert("Failed to update hero description");
    }
  };

  return (
    <>
      <div
        className="w-[90%] m-auto"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="text-black text-2xl font-bold">Case Studies Page</h2>
        <button
          type="button"
          onClick={() => {
            navigate(`/case-studies-new`);
          }}
          className="text-white btn btn-success flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Case Study
        </button>
      </div>

      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          <div className="flex flex-col w-full">
            {/* hero description */}
            <div className="flex flex-col   " style={{ width: "70%" }}>
              <label className="" style={{ color: "grey" }}>
                Hero Description
              </label>
              <div className="flex flex-row gap-2">
                <textarea
                  className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="heroDescription"
                  id="heroDescription"
                  onChange={(e) => {
                    setCaseStudyHero(e.target.value);
                  }}
                  value={caseStudyHero}
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
            {data ? (
              <CaseStudiesCard
                data={data}
                herodata={heroData}
                onView={onView}
              />
            ) : (
              <p>Loading case studies...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
