import React from "react";

export const Button = ({ text, click }) => {
  return (
    <div className="w-full flex justify-center items-center mt-4">
      <button
        onClick={click}
        className="text-white text-[16px] w-[300px] px-5 py-2.5 bg-gradient-to-r from-fromclr to-toclr hover:bg-gradient-to-r hover:from-toclr hover:to-fromclr rounded-full focus:outline-none active:bg-gradient-to-r active:from-custom-purple active:to-custom-blue"
      >
        <p className="font-Lato text-base font-medium leading-[28px] tracking-normal">
          {text}
        </p>
      </button>
    </div>
  );
};
