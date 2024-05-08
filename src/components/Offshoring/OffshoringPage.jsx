import React from "react";
import { useNavigate } from "react-router-dom";
import { OffshoringCard } from "./OffshoringCard"; 

export const OffshoringPage = () => {
  const navigate = useNavigate();

  const data = [
    {
      topDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolorem veniam beatae laborum deserunt fugit repellat qui animi quas earum!",
      bottomDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolorem veniam beatae laborum deserunt fugit repellat qui animi quas earum!",
      offShoreType: [
        {
          name: "Hourly",
          description: "Hourly offshore type involves paying workers based on the number of hours worked.",
          advantages: [
            "Flexibility in adjusting workload and hours.",
            "Transparent billing based on actual work hours.",
            "Easier to track progress and productivity.",
          ],
          comparison: [
            "May be more expensive if hours are not managed efficiently.",
            "Requires effective time tracking systems.",
            "Limited cost predictability compared to fixed-price models.",
            "Can lead to disputes over billed hours.",
            "Not suitable for projects with well-defined scope and timeline.",
            "May incentivize longer hours rather than efficiency.",
          ],
        },
        {
          name: "Fixed",
          description: "Fixed offshore type involves agreeing on a set price for a project or specific tasks.",
          advantages: [
            "Predictable costs for budgeting and planning.",
            "Clear scope and deliverables defined upfront.",
            "Lower risk for budget overruns.",
          ],
          comparison: [
            "Less flexibility for changes or additional work.",
            "Risk of underestimating project scope and costs.",
            "Requires thorough initial planning and requirements gathering.",
            "May lead to disputes if scope changes are not managed effectively.",
            "Can be challenging to accommodate unforeseen issues or changes.",
            "Less suitable for projects with evolving requirements.",
          ],
        },
        {
          name: "BOT",
          description: "Bot offshore type involves leveraging automation and AI-driven bots to perform tasks.",
          advantages: [
            "High speed and efficiency in task execution.",
            "24/7 availability for repetitive tasks.",
            "Reduced error rates compared to human counterparts.",
          ],
          comparison: [
            "Initial investment required for bot development and integration.",
            "May not be suitable for tasks requiring nuanced human judgment.",
            "Limited capability for handling complex or unstructured tasks.",
            "Requires ongoing maintenance and updates for optimal performance.",
            "Potential job displacement concerns.",
            "Not applicable for tasks requiring creativity or empathy.",
          ],
        },
      ],
    },
  ];

  const onView = (id) => {
    navigate(`view/${id}`);
  };

  return (
    <>
      <div className="w-[90%] m-auto" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 className="text-black text-2xl font-bold"> Offshore Page</h2>
      </div>

      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          {data &&
            data.map((item, index) => (
              <div key={index} className="flex flex-col w-full">
                {/* Pass data to OffshoringCard component */}
                <OffshoringCard data={item} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
