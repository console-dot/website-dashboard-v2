import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Expertises({ data, open, closeExpertiseModal, handleOpenEditModal,deleteExpertise }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.expertiseName}
                </th>
                <td className="px-6 py-4">{item?.expertiseDescription}</td>
                <td className="px-6 ">
                  <img
                    src={item?.expertiseImg}
                    alt={item?.expertiseName}
                    className="h-12 w-12"
                  />
                </td>
                <td className="flex flex-row justify-start items-center px-6 py-4">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(index)}
                    className="flex flex-row justify-center items-center text-success"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    onClick={()=>deleteExpertise(index)}
                    className="flex flex-row justify-center items-center text-error ml-2"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
