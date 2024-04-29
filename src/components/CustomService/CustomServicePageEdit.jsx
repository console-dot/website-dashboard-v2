import { useState } from "react";

export default function CustomServicePageEdit() {
  const [formData, setFormData] = useState({
    customServicDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur recusandae quaerat est et culpa unde perferendis voluptates qui quo laudantium!",
    customServicProposition:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro?",
    customServicwhychooseDesc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      customServicWhyChooseUs: ['a','b','c'],
    delivers: { actionDesc: "facebook", collabDesc: "Lorem, ipsum dolor." },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // dispatch(LandingPageEdit(formData));

    // navigate("/landingPage");
  };

  return (
    <div className="w-full">
      <form
        className="flex justify-center flex-col w-[50%] m-auto gap-2"
        method="post"
        onSubmit={handleSubmit}
      >
        {/* Custom Service Model */}
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            Custom Service Model
          </h1>
          <label className="text-webDescrip font-semibold">Description</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="customServicDescription" // corrected name
            id="customServicDescription" // corrected id
            onChange={handleChange}
            value={formData.customServicDescription} // corrected value
            placeholder="Custom Service Description"
          />
          <label className="text-webDescrip font-semibold">Proposition</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="customServicProposition" // corrected name
            id="customServicProposition" // corrected id
            onChange={handleChange}
            value={formData.customServicProposition} // corrected value
            placeholder="Custom Service Proposition"
          />
          <label className="text-webDescrip font-semibold">Why Choose Description</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="customServicProposition" // corrected name
            id="customServicProposition" // corrected id
            onChange={handleChange}
            value={formData.customServicwhychooseDesc} // corrected value
            placeholder="Custom Service Proposition"
          />
          <label className="text-webDescrip font-semibold">Why Choose Us</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="customServicProposition" // corrected name
            id="customServicProposition" // corrected id
            onChange={handleChange}
            value={formData.customServicWhyChooseUsRef} // corrected value
            placeholder="Why Choose Us"
          />
        </div>

        {/* Submit button */}
        <div className="w-full flex justify-center items-center mt-4">
          <button className="text-white text-[16px] w-[300px] px-5 py-2.5 bg-gradient-to-r from-fromclr to-toclr hover:bg-gradient-to-r hover:from-toclr hover:to-fromclr rounded-full focus:outline-none active:bg-gradient-to-r active:from-custom-purple active:to-custom-blue">
            <p className="font-Lato text-base font-medium leading-[28px] tracking-normal">
              Submit
            </p>
          </button>
        </div>
      </form>
    </div>
  );
}
