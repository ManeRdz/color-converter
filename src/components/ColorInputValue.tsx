interface ColorInputValueProps {
  value: number | string;
  callBackFunction: (
    event: React.ChangeEvent<HTMLInputElement>,
    value?: string
  ) => void;
  maxLenght: number;
  width: string;
}

const ColorInputValue = ({
  value,
  maxLenght,
  width,
  callBackFunction,
}: ColorInputValueProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={callBackFunction}
      maxLength={maxLenght}
      style={{ width: `${width}px` }}
      className={`text-text-color bg-input-color pl-1 rounded-sm outline-0`}
    />
  );
};

export default ColorInputValue;
