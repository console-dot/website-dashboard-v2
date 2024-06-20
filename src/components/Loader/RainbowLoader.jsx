import React from "react";

export default function RainbowLoader() {
  return (
    <div className="flex items-center justify-center h-screen w-screen font-helvetica">
      <div className="relative w-[250px] h-[20px] mx-auto">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-[20px] h-[20px] rounded-full border-2 border-white animate-loader`}
            style={{
              backgroundColor: [
                "#8cc759",
                "#8c6daf",
                "#ef5d74",
                "#f9a74b",
                "#60beeb",
                "#fbef5a",
              ][i],
              animationDelay: `${0.5 - i * 0.1}s`,
            }}
          ></div>
        ))}
        <div className="absolute top-[200%] left-0 right-0 w-18 mx-auto text-center font-bold animate-loading-text"></div>
      </div>
    </div>
  );
}
