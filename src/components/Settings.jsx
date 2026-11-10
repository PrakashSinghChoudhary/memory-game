const Settings = ({ onGridChange }) => {
  return (
    <div className="mb-4 text-center">
      <label className="mr-2 font-semibold">Grid Size:</label>
      <select
        onChange={(e) => onGridChange?.(parseInt(e.target.value))}
        className="p-2 border rounded"
      >
        <option value={4}>4x4</option>
        <option value={6}>6x6</option>
        <option value={8}>8x8</option>
      </select>
    </div>
  );
};

export default Settings;
