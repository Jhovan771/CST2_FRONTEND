export default function ResetGraph({ open, onClose, onConfirm }) {
  if (!open) return null;

  const handleClickInside = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex h-screen justify-center items-center transition-colors ${
        open ? "visible bg-black/60" : "invisible"
      }`}>
      <div
        onClick={handleClickInside}
        className='w-96 h-auto bg-gray-50 p-4 rounded-lg border-2 border-red-900'>
        <p className='text-center font-serif mb-4'>
          Are you sure you want to clear all data in the graph?
        </p>
        <div className='flex justify-evenly'>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-600'>
            Yes
          </button>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500'>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
