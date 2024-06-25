import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UiUxCard } from "./UiUxCard";
import { useDispatch } from "react-redux";
import { getUI } from "../../api";
import { setUIData } from "../../redux/uiuxSlice";
import { toast } from "react-toastify";

export const UiUxPage = ({ setIsValid, isValid }) => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const onView = (id) => {
    navigate(`view/${id}`);
  };

  useEffect(() => {
    getUI()
      .then((res) => {
        if (res == 403) {
          setIsValid(false);
        }
        setData(res?.data);
        dispatch(setUIData(res?.data));
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
        <h2 className="text-black text-2xl font-bold">Ui/Ux Service Page</h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          {data && (
            <div className="flex flex-col w-full">
              <UiUxCard data={data} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
