// CustomService Model (description,  Proposition, whychooseDesc,  WhyChoose[ref], delivers {actionDesc, actionDesc})
import React, { useEffect, useState } from "react";
import { ProductResearchCard } from "./ProductResearchCard";
import { getproductresearchpage } from "../../api/productresearch";
import { setproductresearchData } from "../../redux/productresearchSlice";
import { useDispatch } from "react-redux";
import RainbowLoader from "../Loader/RainbowLoader";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const ProductResearchPage = ({ setIsValid, isValid }) => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    getproductresearchpage()
      .then((res) => {
        if (res == 403) {
          setIsValid(false);
        }
        setData(res?.data);
        dispatch(setproductresearchData(res?.data));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("isValid",isValid)
    if (!isValid) {
      toast.warning("You Session has been Expired. Please Login Again", {
        autoClose: 1500,
        onClose: () => {},
      });
    }
  }, [location.pathname, isValid]);


  if (!data) {
    return <RainbowLoader />;
  }

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
        <h2 className="text-black text-2xl font-bold">
          Product Research Service Page
        </h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          <div className="flex flex-col w-full">
            <ProductResearchCard data={data} />
          </div>
        </div>
      </div>
    </>
  );
};
