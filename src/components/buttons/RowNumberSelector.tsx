type SelectorProps = {
  onChange: any;
  value: any;
};

const RowNumberSelector = ({ value, onChange }: SelectorProps) => (
  <div className="relative">
    <select
      onChange={onChange}
      value={value}
      className="h-full rounded-l border block appearance-none bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    >
      <option>5</option>
      <option>10</option>
      <option>20</option>
      <option>30</option>
      <option>40</option>
    </select>
  </div>
);
export default RowNumberSelector;
