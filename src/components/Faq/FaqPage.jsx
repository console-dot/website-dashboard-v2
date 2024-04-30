import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

export const FaqPage = () => {
  const [formData, setFormData] = useState([
    {
      question: 'What do you mean by "Figma assets"?',
      answer:
        "You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens."
    }
  ]);

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
        // If editing an existing item
        const updatedQuestions = [...formData];
        updatedQuestions[editingIndex] = { question, answer };
        setFormData(updatedQuestions);
        setEditingIndex(null);
      } else {
        // If adding a new item
        const newQuestion = { question, answer };
        const newQuestions = [...formData, newQuestion];
        setFormData(newQuestions);
      }

      // Reset the form fields
      questionInput.value = "";
      answerInput.value = "";
    }
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = formData.filter((_, i) => i !== index);
    setFormData(updatedQuestions);
  };

  const editQuestion = (index) => {
    const question = formData[index];
    const form = document.getElementById("faqForm");
    form.querySelector('[name="question"]').value = question.question;
    form.querySelector('[name="answer"]').value = question.answer;
    setEditingIndex(index);
  };
console.log(formData)
  return (
    <div className="w-full">
      <section className="bg-white dark:bg-gray-900 w-full">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 w-full">
          <h2 className="text-2xl font-bold tracking-tight mb-4 text-black  dark:text-white">
            Frequently asked questions
          </h2>
          <div className="grid pt-8 text-left w-full border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-1">
            <div className="flex flex-col gap-8 w-full">
              {formData.map((qa, index) => (
                <div key={index} className="mb-6">
                  <div className="flex items-center gap-4 mb-2 text-lg font-medium text-black dark:text-white">
                    <FaQuestionCircle />
                    
                    <div>{qa.question}</div>
                  </div>
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
                  <div className="flex items-center gap-4 mb-2 text-lg font-medium text-black dark:text-white">
                    <FaQuestionCircle />
                    <input
                      type="text"
                      className="bg-white w-full"
                      name="question"
                      placeholder="Enter the question"
                    />
                  </div>
                  <textarea
                    className="text-gray-500 bg-white dark:text-gray-400"
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
