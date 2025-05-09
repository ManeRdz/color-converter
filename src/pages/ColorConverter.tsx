import { useEffect, useState } from "react";
import { HslColor, RgbColor, RgbColorPicker } from "react-colorful";

const ColorConverter = () => {
  const [RGBColor, setRGBColor] = useState<RgbColor>({
    r: 255,
    g: 0,
    b: 0,
  });
  const [HSLColor, setHSLColor] = useState<HslColor>(rgbToHsl(RGBColor));
  const [HEXColor, setHEXColor] = useState<string>(rgbToHex(RGBColor));
  const [lastChanged, setLastChanged] = useState<"rgb" | "hex">("rgb");

  function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
    return [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");
  }

  function rgbToHsl({ r, g, b }: { r: number; g: number; b: number }) {
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return { h: 0, s: 0, l: 0 };
    }

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  function hexToRgb(hex: string) {
    hex = hex.replace("#", "");

    if (!hex || !/^[0-9A-Fa-f]{3,6}$/.test(hex)) {
      return { r: 0, g: 0, b: 0 };
    }

    let paddedHex = hex;
    if (hex.length < 6) {
      paddedHex = hex.padEnd(6, "0");
    }

    if (paddedHex.length === 3) {
      paddedHex = paddedHex
        .split("")
        .map((char) => char + char)
        .join("");
    }

    const r = parseInt(paddedHex.substring(0, 2), 16);
    const g = parseInt(paddedHex.substring(2, 4), 16);
    const b = parseInt(paddedHex.substring(4, 6), 16);

    return { r, g, b };
  }

  function hexToHsl(hex: string) {
    const { r, g, b } = hexToRgb(hex);

    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const delta = max - min;
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

      switch (max) {
        case rNorm:
          h = (gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0);
          break;
        case gNorm:
          h = (bNorm - rNorm) / delta + 2;
          break;
        case bNorm:
          h = (rNorm - gNorm) / delta + 4;
          break;
      }
      h /= 6;
    }

    // Convertir a grados y porcentajes
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  const changeColor = (color: RgbColor) => {
    setRGBColor(color);
    setHEXColor(rgbToHex(color));
    setHSLColor(rgbToHsl(color));
  };

  const changeRGBInputColor = (
    value: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;

    if (/^\d{0,3}$/.test(inputValue)) {
      setLastChanged("rgb");
      if (value === "r") {
        setRGBColor((prev) => ({ ...prev, r: Number(inputValue) }));
      } else if (value === "g") {
        setRGBColor((prev) => ({ ...prev, g: Number(inputValue) }));
      } else if (value === "b") {
        setRGBColor((prev) => ({ ...prev, b: Number(inputValue) }));
      }
    }
  };

  const changeHEXInputColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "" || /^[0-9A-Fa-f]{0,6}$/.test(inputValue)) {
      setLastChanged("hex");
      setHEXColor(inputValue);
    }
  };

  useEffect(() => {
    if (lastChanged === "rgb") {
      setHEXColor(rgbToHex(RGBColor));
      setHSLColor(rgbToHsl(RGBColor));
    }
  }, [RGBColor, lastChanged]);

  useEffect(() => {
    if (lastChanged === "hex") {
      setRGBColor(hexToRgb(HEXColor));
      setHSLColor(hexToHsl(HEXColor));
    }
  }, [HEXColor, lastChanged]);

  return (
    <div className="dark:bg-background min-h-[100dvh] flex items-center justify-center">
      <div className="bg-card-color p-2 flex items-start gap-10 w-[800px]">
        <div>
          <RgbColorPicker
            color={RGBColor}
            onChange={(color) => changeColor(color)}
          />
        </div>
        <div className="flex items-center justify-start flex-wrap gap-8">
          <div className="flex items-center justify-center gap-2">
            <p className="text-text-color">RGB (</p>
            <input
              type="text"
              value={RGBColor.r}
              onChange={(e) => changeRGBInputColor("r", e)}
              maxLength={3}
              placeholder="Enter a number"
              className="text-text-color w-10 bg-neutral-700 pl-1 rounded-sm outline-0"
            />
            <span className="text-text-color">,</span>
            <input
              type="text"
              value={RGBColor.g}
              onChange={(e) => changeRGBInputColor("g", e)}
              maxLength={3}
              placeholder="Enter a number"
              className="text-text-color w-10 bg-neutral-700 pl-1 rounded-sm outline-0"
            />
            <span className="text-text-color">,</span>
            <input
              type="text"
              value={RGBColor.b}
              onChange={(e) => changeRGBInputColor("b", e)}
              maxLength={3}
              placeholder="Enter a number"
              className="text-text-color w-10 bg-neutral-700 pl-1 rounded-sm outline-0"
            />
            <p className="text-text-color">)</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-text-color">HEX #</p>
            <input
              type="text"
              value={HEXColor}
              onChange={changeHEXInputColor}
              maxLength={6}
              placeholder="Enter a number"
              className="text-text-color w-20 bg-neutral-700 pl-1 rounded-sm outline-0"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-text-color">HSL (</p>
            <input
              type="text"
              value={HSLColor.h}
              onChange={(e) => changeRGBInputColor("r", e)}
              maxLength={3}
              placeholder="Enter a number"
              className="text-text-color w-10 bg-neutral-700 pl-1 rounded-sm outline-0"
            />
            <span className="text-text-color">,</span>
            <input
              type="text"
              value={HSLColor.s}
              onChange={(e) => changeRGBInputColor("g", e)}
              maxLength={3}
              placeholder="Enter a number"
              className="text-text-color w-10 bg-neutral-700 pl-1 rounded-sm outline-0"
            />
            <span className="text-text-color">% ,</span>
            <input
              type="text"
              value={HSLColor.l}
              onChange={(e) => changeRGBInputColor("b", e)}
              maxLength={3}
              placeholder="Enter a number"
              className="text-text-color w-10 bg-neutral-700 pl-1 rounded-sm outline-0"
            />
            <p className="text-text-color">% )</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;
