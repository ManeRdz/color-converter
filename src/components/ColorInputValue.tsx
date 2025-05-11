interface ColorInputValueProps {
  value: number | string;
  callBackFunction: (
    event: React.ChangeEvent<HTMLInputElement>,
    value?: string
  ) => void;
  maxLenght: number;
  width: number;
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
      className={`text-text-color w-${width} bg-input-color pl-1 rounded-sm outline-0`}
    />
  );
};

export default ColorInputValue;
