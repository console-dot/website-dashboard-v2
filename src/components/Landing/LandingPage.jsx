import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandingCard } from "./LandingCard";

const data = [
  {
    heroDescription: "Leading provider of tech solutions.",
    footerDescription: "Dedicated to innovation and excellence.",
    email: "contact@techsolutions.com",
    phone: "+1234567890",
    address: "123 Tech Street, Silicon Valley, CA",
    socialLinks: [
      { name: "facebook", link: "https://twitter.com/techsolutions" },
      { name: "youtube", link: "https://youtube.com/techsolutions" },
    ],
    workExperience: {
      countries: "USA, Canada, Germany",
      expEmployees: "200+",
      scrumTeams: "15",
      fullStackDev: "50+",
    },
    aboutDescription:
      "TechSolutions specializes in providing high-quality IT services and innovative solutions to global clients.",
    offshoreType: "Dedicated Development Center",
    offshoreDescription:
      "Offers flexible engagement models and full control over the process.",
    offshoreAdvantages: [
      "Cost Effective",
      "Scalable Resources",
      "Expert Teams",
    ],
    offshoreComparison: [
      "Dedicated Team",
      "Freelance",
      "Better Collaboration",
      "Consistency",
    ],
    testimonialImage: "62bc76f7b3dc2f001f6b8b3b", // Example ObjectId from MongoDB
    testimonialFullName: "Jane Doe",
    testimonialDescription:
      "The team at TechSolutions went above and beyond to meet our needs.",
    testimonialDesignation: "CEO of Innovative Tech Co.",
    expertiseImage: "62bc76f7b3dc2f001f6b8b3c", // Example ObjectId from MongoDB
    expertiseName: "Cloud Solutions",
    expertiseDescription:
      "Expertise in building scalable cloud platforms tailored to client needs.",
  },
];

export const LandingPage = () => {
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
        <h2 className="text-black text-2xl font-bold">Landing Page</h2>
      </div>

      {/* Center */}
      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          {data &&
            data.map((item, index) => (
              <div key={index} className="flex flex-col w-full">
                <LandingCard data={item} onView={() => onView(index)} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
