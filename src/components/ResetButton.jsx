const ResetButton = ({ onReset }) => {
  return (
    <button
      onClick={onReset}
      className="fixed bottom-4 right-4 z-50 px-4 py-2 rounded-full shadow text-sm font-medium text-blue-900 bg-linear-to-tr from-blue-400 via-cyan-300 to-white hover:brightness-105 transition"
    >
      <span role="img" aria-label="reset">
        🔄
      </span>
    </button>
  );
};

export default ResetButton;
