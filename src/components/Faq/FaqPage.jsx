import React, { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { editFaq, getFaq } from "../../api";

export const FaqPage = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // console.log("newData", newData);
    getFaq()
      .then((res) => {
        setFormData(res?.data?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const questionInput = form.querySelector('[name="question"]');
    const answerInput = form.querySelector('[name="answer"]');
    const question = questionInput.value;
    const answer = answerInput.value;

    if (question && answer) {
      if (editingIndex !== null) {
        const updatedQuestions = [...formData];
        updatedQuestions[editingIndex] = { question, answer };
        // Call Api
        editFaq({ data: updatedQuestions })
          .then((res) => {
            console.log("res", res);
            setFormData(res?.data?.data);
          })
          .catch((err) => console.log(err));
        // Set Form
        // setFormData(updatedQuestions);
        setEditingIndex(null);
      } else {
        const newQuestion = { question, answer };
        const newQuestions = [...formData, newQuestion];
        // Call Api
        editFaq({ data: newQuestions })
          .then((res) => {
            console.log("res", res);
            setFormData(res?.data?.data);
          })
          .catch((err) => console.log(err));
        // set form
        // setFormData(newQuestions);
      }

      questionInput.value = "";
      answerInput.value = "";
    }
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = formData.filter((_, i) => i !== index);
    // Call Api
    editFaq({ data: updatedQuestions })
      .then((res) => {
        console.log("res", res);
        setFormData(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  const editQuestion = (index) => {
    const question = formData[index];
    const form = document.getElementById("faqForm");
    form.querySelector('[name="question"]').value = question.question;
    form.querySelector('[name="answer"]').value = question.answer;
    setEditingIndex(index);
  };

  return (
    <div className="w-full">
      <section className="bg-custom-white w-full">
        <div className="p-6 mx-auto max-w-screen-xl  w-full">
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center ">
            Frequantly Asked Questions
          </h1>
          <div className="grid pt-8 text-left w-full border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-1">
            <div className="flex flex-col gap-8 w-full">
              {formData.map((qa, index) => (
                <div key={index} className="mb-6">
                  <label className="text-webDescrip font-semibol text-[20px] ">
                    <div className="flex flex-row justify-start gap-2">
                      <FaQuestionCircle />
                      {qa.question}
                    </div>
                  </label>
                  <div className="text-gray-500 bg-white dark:text-gray-400">
                    {qa.answer}
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button
                      className="bg-custom-purple text-white p-2 px-4 rounded-lg"
                      onClick={() => editQuestion(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-700 text-white p-2 px-4 rounded-lg"
                      onClick={() => deleteQuestion(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <form id="faqForm" onSubmit={handleSubmit}>
                <div className="mb-6 flex flex-col gap-4 w-full">
                  <div className="flex flex-row gap-2 justify-start">
                    <label className="text-webDescrip font-semibol text-[20px] ">
                      <div className="flex flex-row justify-start gap-2">
                        <FaQuestionCircle />
                      </div>
                    </label>
                    <input
                      type="text"
                      className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="question"
                      placeholder="Enter the question"
                    />
                  </div>

                  <textarea
                    className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="answer"
                    placeholder="Enter the answer"
                  />
                  <button
                    className="bg-blue-500 text-white p-2 px-4 rounded-lg"
                    type="submit"
                  >
                    {editingIndex !== null ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
