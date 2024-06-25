// CustomService Model (description,  Proposition, whychooseDesc,  WhyChoose[ref], delivers {actionDesc, actionDesc})
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomServiceCard } from "./CustomServiceCard";
import { getcustomservicepage } from "../../api/customservice";
import { useDispatch } from "react-redux";
import { setCustomServiceData } from "../../redux/customServiceSlice";
import { toast } from "react-toastify";

export const CustomServicePage = ({ setIsValid, isValid }) => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const onView = (id) => {
    navigate(`view/${id}`);
  };

  useEffect(() => {
    getcustomservicepage()
      .then((res) => {
        if (res == 403) {
          setIsValid(false);
        }
        setData(res?.data);
        dispatch(setCustomServiceData(res?.data));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("isValid", isValid);
    if (!isValid) {
      toast.warning("You Session has been Expired. Please Login Again", {
        autoClose: 1500,
        onClose: () => {},
      });
    }
  }, [location.pathname, isValid]);

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
          Custom Software Service Page
        </h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          <div className="flex flex-col w-full">
            <CustomServiceCard data={data} />
          </div>
        </div>
      </div>
    </>
  );
};
