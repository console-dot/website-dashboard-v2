import { useState } from 'react';

const EditTypeModal = ({ isOpen, onClose, onSubmit, existingTypeName }) => {
  const [editedTypeName, setEditedTypeName] = useState(existingTypeName);

  const handleSubmit = () => {
    onSubmit(editedTypeName);
    setEditedTypeName('');
    onClose();
  };

  return (
    <div className={`${isOpen ? 'fixed' : 'hidden'} inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75`}>
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Edit Type</h2>
        <input
          type="text"
          value={editedTypeName}
          onChange={(e) => setEditedTypeName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
          placeholder="Type Name"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTypeModal;
