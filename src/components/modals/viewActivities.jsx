export default function ViewAct({ open, onClose, children }) {
  if (!open) return null;

  const handleClickInside = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex h-screen justify-center 
        items-center transition-colors${
          open ? "visible bg-black/60" : "invisible"
        }`}>
      <div
        onClick={handleClickInside}
        className='w-auto h-auto bg-gray-50 p-4 rounded-lg border-2 border-red-900'>
        {children}
      </div>
    </div>
  );
}
