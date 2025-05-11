import { useEffect, useRef, useState } from "react";
import { HslColor, RgbColor, RgbColorPicker } from "react-colorful";
import { useTranslation } from "react-i18next";
import { ColorHandler } from "../utils/ColorHandler";
import { CMYKColor } from "../types";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import ColorInputValue from "../components/ColorInputValue";

const ColorConverter = () => {
  const colorHandler = new ColorHandler();
  const timeoutRef = useRef(0);
  const [notificationState, setNotificationState] = useState<
    "hidden" | "showing" | "hiding"
  >("hidden");

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
    e: React.ChangeEvent<HTMLInputElement>,
    channel: string
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
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
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
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
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

  const copyColor = (value: string) => {
    clearTimeout(timeoutRef.current);

    setNotificationState("showing");
    navigator.clipboard.writeText(value);

    timeoutRef.current = setTimeout(() => {
      setNotificationState("hiding");

      timeoutRef.current = setTimeout(() => {
        setNotificationState("hidden");
      }, 300);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="dark:bg-background min-h-[100dvh] flex items-center justify-center max-md:pt-32 max-md:pb-14">
      {notificationState !== "hidden" && (
        <div
          className={`
            fixed text-sm shadow-sm bg-card-color text-text-color bottom-32 rounded-sm p-2 
            flex items-center justify-start gap-2
            ${
              notificationState === "showing"
                ? "animate-slide-up"
                : "animate-slide-down"
            }
          `}
        >
          <FaCheckCircle className="text-md text-emerald-600" />
          {t("colorCopied")}
        </div>
      )}
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
                  <ColorInputValue
                    value={RGBColor.r}
                    callBackFunction={(e) => changeRGBInputColor(e, "r")}
                    maxLenght={3}
                    width={10}
                  />
                  <span className="text-text-color max-md:text-sm">,</span>
                  <ColorInputValue
                    value={RGBColor.g}
                    callBackFunction={(e) => changeRGBInputColor(e, "g")}
                    maxLenght={3}
                    width={10}
                  />
                  <span className="text-text-color max-md:text-sm">,</span>
                  <ColorInputValue
                    value={RGBColor.b}
                    callBackFunction={(e) => changeRGBInputColor(e, "b")}
                    maxLenght={3}
                    width={10}
                  />
                  <p className="text-text-color max-md:text-sm">)</p>
                  <MdOutlineContentCopy
                    onClick={() =>
                      copyColor(
                        `rgb(${RGBColor.r},${RGBColor.g},${RGBColor.b})`
                      )
                    }
                    className="cursor-pointer text-secondary-text-color"
                  />
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
                <ColorInputValue
                  value={HEXColor}
                  callBackFunction={(e) => changeHEXInputColor(e)}
                  maxLenght={6}
                  width={20}
                />
                <MdOutlineContentCopy
                  onClick={() => copyColor(`#${HEXColor}`)}
                  className="cursor-pointer text-secondary-text-color"
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <div
                  className="w-5 h-5 shadow-md"
                  style={{
                    backgroundColor: `rgb(${RGBColor.r}, ${RGBColor.g}, ${RGBColor.b})`,
                  }}
                ></div>

                <p className="text-text-color max-md:text-sm">HSL (</p>
                <ColorInputValue
                  value={HSLColor.h}
                  callBackFunction={(e) => changeHSLInputColor(e, "h")}
                  maxLenght={3}
                  width={10}
                />
                <span className="text-text-color max-md:text-sm">,</span>
                <ColorInputValue
                  value={HSLColor.s}
                  callBackFunction={(e) => changeHSLInputColor(e, "s")}
                  maxLenght={3}
                  width={10}
                />
                <span className="text-text-color max-md:text-sm">% ,</span>
                <ColorInputValue
                  value={HSLColor.l}
                  callBackFunction={(e) => changeHSLInputColor(e, "l")}
                  maxLenght={3}
                  width={10}
                />
                <p className="text-text-color max-md:text-sm">% )</p>
                <MdOutlineContentCopy
                  onClick={() =>
                    copyColor(
                      `hsl(${HSLColor.h}, ${HSLColor.s}%, ${HSLColor.l}%)`
                    )
                  }
                  className="cursor-pointer text-secondary-text-color"
                />
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
                  <ColorInputValue
                    value={CMYKColor.c}
                    callBackFunction={(e) => changeCMYKInputColor(e, "c")}
                    maxLenght={3}
                    width={10}
                  />
                  <span className="text-text-color max-md:text-sm">% ,</span>
                  <ColorInputValue
                    value={CMYKColor.m}
                    callBackFunction={(e) => changeCMYKInputColor(e, "m")}
                    maxLenght={3}
                    width={10}
                  />
                  <span className="text-text-color max-md:text-sm">% ,</span>
                  <ColorInputValue
                    value={CMYKColor.y}
                    callBackFunction={(e) => changeCMYKInputColor(e, "y")}
                    maxLenght={3}
                    width={10}
                  />
                  <span className="text-text-color max-md:text-sm">% ,</span>
                  <ColorInputValue
                    value={CMYKColor.k}
                    callBackFunction={(e) => changeCMYKInputColor(e, "k")}
                    maxLenght={3}
                    width={10}
                  />
                  <p className="text-text-color max-md:text-sm">%)</p>
                  <MdOutlineContentCopy
                    onClick={() =>
                      copyColor(
                        `cmyk(${CMYKColor.c}%, ${CMYKColor.m}%, ${CMYKColor.y}%, ${CMYKColor.k}%)`
                      )
                    }
                    className="ml-2 cursor-pointer text-secondary-text-color"
                  />
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
