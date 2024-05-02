// CustomService Model (description,  Proposition, whychooseDesc,  WhyChoose[ref], delivers {actionDesc, actionDesc})
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArVrCard } from "./ArVrCard";

const data = [
  {
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur recusandae quaerat est et culpa unde perferendis voluptates qui quo laudantium!",

    whyChoose: [
      "Expertise in Immersive Technology",
      "Innovation-Driven Solutions",
      "Client-Centric Collaboration",
      "Tailored Experiences",
    ],
    techStack: [
      { name: "React", type: "Frontend", img: "react.png" },
      { name: "Node.js", type: "Backend", img: "nodejs.png" },
      // Add more technologies as needed
    ],
  },
];

export const ArVrPage = () => {
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
        <h2 className="text-black text-2xl font-bold">
          Ar/Vr Service Page
        </h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          {data &&
            data.map((item, index) => (
              <div key={index} className="flex flex-col w-full">
                <ArVrCard data={item} onView={() => onView(index)} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};