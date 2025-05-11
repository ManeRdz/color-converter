import { useEffect, useRef, useState } from "react";
import { HslColor, RgbColor, RgbColorPicker } from "react-colorful";
import { useTranslation } from "react-i18next";
import { ColorHandler } from "../utils/ColorHandler";
import { CMYKColor } from "../types";
import { MdOutlineContentCopy } from "react-icons/md";

const ColorConverter = () => {
  const colorHandler = new ColorHandler();

  const [RGBColor, setRGBColor] = useState<RgbColor>({
    r: 255,
    g: 0,
    b: 0,
  });
  const [HSLColor, setHSLColor] = useState<HslColor>(
    colorHandler.rgbToHsl(RGBColor)
  );
  const [HEXColor, setHEXColor] = useState<string>(
    colorHandler.rgbToHex(RGBColor)
  );
  const [CMYKColor, setCMYKColor] = useState<CMYKColor>(
    colorHandler.rgbToCmyk(RGBColor)
  );

  const { t } = useTranslation();

  const changeRGBColor = (rgbColor: RgbColor): void => {
    setRGBColor(rgbColor);
    setHEXColor(colorHandler.rgbToHex(rgbColor));
    setHSLColor(colorHandler.rgbToHsl(rgbColor));
    setCMYKColor(colorHandler.rgbToCmyk(rgbColor));
  };

  const changeHexColor = (hexColor: string): void => {
    setHEXColor(hexColor);
    setRGBColor(colorHandler.hexToRgb(hexColor));
    setHSLColor(colorHandler.hexToHsl(hexColor));
    setCMYKColor(colorHandler.hexToCmyk(hexColor));
  };

  const changeHSLColor = (hslColor: HslColor): void => {
    setHSLColor(hslColor);
    setRGBColor(colorHandler.hslToRgb(hslColor));
    setHEXColor(colorHandler.hslToHex(hslColor));
    setCMYKColor(colorHandler.hslToCmyk(hslColor));
  };

  const changeCMYKColor = (cmykColor: CMYKColor): void => {
    setCMYKColor(cmykColor);
    setRGBColor(colorHandler.cmykToRgb(cmykColor));
    setHEXColor(colorHandler.cmykToHex(cmykColor));
    setHSLColor(colorHandler.cmykToHsl(cmykColor));
  };

  const changeRGBInputColor = (
    channel: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue = e.target.value;

    if (!/^\d{0,3}$/.test(inputValue)) return;

    if (inputValue === "") {
      const validRgbColor = { ...RGBColor, [channel]: 0 };
      changeRGBColor(validRgbColor);
      return;
    }

    const numericValue = parseInt(inputValue, 10);

    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 255) {
      const newRgbColor = { ...RGBColor, [channel]: numericValue };
      changeRGBColor(newRgbColor);
    }
  };

  const changeHSLInputColor = (
    value: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue = e.target.value;

    if (!/^\d{0,3}$/.test(inputValue)) return;

    if (inputValue === "") {
      setHSLColor((prev) => ({ ...prev, [value]: 0 }));
      return;
    }

    const numericValue = parseInt(inputValue, 10);
    if (isNaN(numericValue)) return;

    if (value === "h" && numericValue >= 0 && numericValue <= 360) {
      const newHSLColor = { ...HSLColor, h: numericValue };
      changeHSLColor(newHSLColor);
    } else if (
      (value === "s" || value === "l") &&
      numericValue >= 0 &&
      numericValue <= 100
    ) {
      const newHSLColor = { ...HSLColor, [value]: numericValue };
      changeHSLColor(newHSLColor);
    }
  };

  const changeHEXInputColor = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue = e.target.value;

    if (inputValue === "" || /^[0-9A-Fa-f]{0,6}$/.test(inputValue)) {
      changeHexColor(inputValue);
    }
  };

  const changeCMYKInputColor = (
    value: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;

    if (!/^\d{0,3}$/.test(inputValue)) return;

    if (inputValue === "") {
      setCMYKColor((prev) => ({ ...prev, [value]: 0 }));
      return;
    }

    const numericValue = parseInt(inputValue, 10);
    if (isNaN(numericValue)) return;

    if (numericValue >= 0 && numericValue <= 100) {
      const newCMYKColor = { ...CMYKColor, [value]: numericValue };
      changeCMYKColor(newCMYKColor);
    }
  };

  const setRandomColor = (): void => {
    const randomR: number = Math.floor(Math.random() * 256);
    const randomG: number = Math.floor(Math.random() * 256);
    const randomB: number = Math.floor(Math.random() * 256);

    const randomRGBColor: RgbColor = { r: randomR, g: randomG, b: randomB };

    changeRGBColor(randomRGBColor);
  };

  return (
    <div className="dark:bg-background min-h-[100dvh] flex items-center justify-center max-md:pt-32">
      <div className="bg-card-color shadow-sm p-8 flex flex-col items-start justify-center gap-6 w-[50%] max-lg:w-[90%] max-md:w-[95%]">
        <div className="flex justify-center items-start flex-col">
          <h1 className="text-2xl font-bold text-text-color">
            {t("colorConverter")}
          </h1>
          <h3 className="text-sm text-secondary-text-color">
            {t("colorConverterDescription")}
          </h3>
        </div>
        <div className="flex items-startjustify-start flex-wrap gap-8 w-[100%]">
          <div className="w-[300px]">
            <RgbColorPicker
              color={RGBColor}
              style={{ width: "300px", height: "300px" }}
              onChange={(color) => changeRGBColor(color)}
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-10 w-[400px]">
            <div className="flex items-center justify-start flex-wrap gap-8">
              <div className="flex items-center justify-start flex-wrap gap-2">
                <div className="flex items-center justify-center gap-2">
                  <div
                    className="w-5 h-5 shadow-md"
                    style={{
                      backgroundColor: `rgb(${RGBColor.r}, ${RGBColor.g}, ${RGBColor.b})`,
                    }}
                  ></div>
                  <p className="text-text-color max-md:text-sm">RGB (</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <input
                    type="text"
                    value={RGBColor.r}
                    onChange={(e) => changeRGBInputColor("r", e)}
                    maxLength={3}
                    placeholder="Enter a number"
                    className="text-text-color w-10 bg-input-color pl-1 rounded-sm outline-0"
                  />
                  <span className="text-text-color max-md:text-sm">,</span>
                  <input
                    type="text"
                    value={RGBColor.g}
                    onChange={(e) => changeRGBInputColor("g", e)}
                    maxLength={3}
                    placeholder="Enter a number"
                    className="text-text-color w-10 bg-input-color pl-1 rounded-sm outline-0"
                  />
                  <span className="text-text-color max-md:text-sm">,</span>
                  <input
                    type="text"
                    value={RGBColor.b}
                    onChange={(e) => changeRGBInputColor("b", e)}
                    maxLength={3}
                    placeholder="Enter a number"
                    className="text-text-color w-10 bg-input-color pl-1 rounded-sm outline-0"
                  />
                  <p className="text-text-color max-md:text-sm">)</p>
                  <MdOutlineContentCopy className="cursor-pointer text-neutral-700" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div
                  className="w-5 h-5 shadow-md"
                  style={{
                    backgroundColor: `rgb(${RGBColor.r}, ${RGBColor.g}, ${RGBColor.b})`,
                  }}
                ></div>
                <p className="text-text-color max-md:text-sm">HEX #</p>
                <input
                  type="text"
                  value={HEXColor}
                  onChange={changeHEXInputColor}
                  maxLength={6}
                  className="text-text-color w-20 bg-input-color pl-1 rounded-sm outline-0"
                />
                <MdOutlineContentCopy className="cursor-pointer text-neutral-700" />
              </div>
              <div className="flex items-center justify-center gap-2">
                <div
                  className="w-5 h-5 shadow-md"
                  style={{
                    backgroundColor: `rgb(${RGBColor.r}, ${RGBColor.g}, ${RGBColor.b})`,
                  }}
                ></div>

                <p className="text-text-color max-md:text-sm">HSL (</p>
                <input
                  type="text"
                  value={HSLColor.h}
                  onChange={(e) => changeHSLInputColor("h", e)}
                  maxLength={3}
                  placeholder="Enter a number"
                  className="text-text-color w-10 bg-input-color pl-1 rounded-sm outline-0"
                />
                <span className="text-text-color max-md:text-sm">,</span>
                <input
                  type="text"
                  value={HSLColor.s}
                  onChange={(e) => changeHSLInputColor("s", e)}
                  maxLength={3}
                  placeholder="Enter a number"
                  className="text-text-color w-10 bg-input-color pl-1 rounded-sm outline-0"
                />
                <span className="text-text-color max-md:text-sm">% ,</span>
                <input
                  type="text"
                  value={HSLColor.l}
                  onChange={(e) => changeHSLInputColor("l", e)}
                  maxLength={3}
                  placeholder="Enter a number"
                  className="text-text-color w-10 bg-input-color pl-1 rounded-sm outline-0"
                />
                <p className="text-text-color max-md:text-sm">% )</p>
                <MdOutlineContentCopy className="cursor-pointer text-neutral-700" />
              </div>
              <div className="flex items-center justify-start flex-wrap gap-2">
                <div className="flex items-center justify-center gap-1">
                  <div
                    className="w-5 h-5 shadow-md"
                    style={{
                      backgroundColor: `rgb(${RGBColor.r}, ${RGBColor.g}, ${RGBColor.b})`,
                    }}
                  ></div>
                  <p className="text-text-color max-md:text-sm">CMYK</p>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-text-color max-md:text-sm">( </span>
                  <input
                    type="text"
                    value={CMYKColor.c}
                    onChange={(e) => changeCMYKInputColor("c", e)}
                    maxLength={3}
                    placeholder="Enter a number"
                    className="text-text-color w-10 bg-input-color pl-1 rounded-sm outline-0"
                  />
                  <span className="text-text-color max-md:text-sm">% ,</span>
                  <input
                    type="text"
                    value={CMYKColor.m}
                    onChange={(e) => changeCMYKInputColor("m", e)}
                    maxLength={3}
                    placeholder="Enter a number"
                    className="text-text-color w-10 bg-input-color pl-1 rounded-sm outline-0"
                  />
                  <span className="text-text-color max-md:text-sm">% ,</span>
                  <input
                    type="text"
                    value={CMYKColor.y}
                    onChange={(e) => changeCMYKInputColor("y", e)}
                    maxLength={3}
                    placeholder="Enter a number"
                    className="text-text-color w-10 bg-input-color pl-1 rounded-sm outline-0"
                  />
                  <span className="text-text-color max-md:text-sm">% ,</span>
                  <input
                    type="text"
                    value={CMYKColor.k}
                    onChange={(e) => changeCMYKInputColor("k", e)}
                    maxLength={3}
                    placeholder="Enter a number"
                    className="text-text-color w-10 bg-input-color pl-1 rounded-sm outline-0"
                  />
                  <p className="text-text-color max-md:text-sm">%)</p>
                  <MdOutlineContentCopy className="ml-2 cursor-pointer text-neutral-700" />
                </div>
              </div>
            </div>
            <button
              onClick={setRandomColor}
              className="bg-blue-500 text-neutral-100 cursor-pointer hover:bg-blue-600 transition-all ease-in rounded-sm p-2 text-sm"
            >
              {t("randomColorButton")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;
