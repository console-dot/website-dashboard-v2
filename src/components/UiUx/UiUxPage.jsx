// CustomService Model (description,  Proposition, whychooseDesc,  WhyChoose[ref], delivers {actionDesc, actionDesc})
import React from "react";
import { useNavigate } from "react-router-dom";
import { UiUxCard } from "./UiUxCard";

const data = [
  {
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur recusandae quaerat est et culpa unde perferendis voluptates qui quo laudantium!",

    whyChoose: [
      "Expert UI/UX Designers",
      "Innovative Design Solutions",
      "Client-Centric Approach",
      "Holistic User Experience",
    ],
    techStack: [
      { name: "React", type: "Frontend", img: "react.png" },
      { name: "Node.js", type: "Backend", img: "nodejs.png" },
      // Add more technologies as needed
    ],
  },
];

export const UiUxPage = () => {
  //   const [data, setData] = useState();
  const navigate = useNavigate();

  const onView = (id) => {
    navigate(`view/${id}`);
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
        <h2 className="text-black text-2xl font-bold">Ui/Ux Service Page</h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          {data &&
            data.map((item, index) => (
              <div key={index} className="flex flex-col w-full">
                <UiUxCard data={item} onView={() => onView(index)} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
