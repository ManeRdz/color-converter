import { HslColor, RgbColor } from "react-colorful";
import { CMYKColor } from "../types";

export class ColorHandler {
  rgbToHex({ r, g, b }: RgbColor): string {
    return [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");
  }

  rgbToHsl({ r, g, b }: RgbColor): HslColor {
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

  hexToRgb(hex: string): RgbColor {
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

  hexToHsl(hex: string): HslColor {
    const { r, g, b } = this.hexToRgb(hex);

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

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  hslToHex({ h, s, l }: HslColor): string {
    const { r, g, b } = this.hslToRgb({ h, s, l });
    return [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");
  }

  hslToRgb({ h, s, l }: HslColor): RgbColor {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
      g = 0,
      b = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (h >= 300 && h <= 360) {
      r = c;
      g = 0;
      b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  }

  rgbToCmyk({ r, g, b }: RgbColor): CMYKColor {
    let c = 1 - r / 255;
    let m = 1 - g / 255;
    let y = 1 - b / 255;

    const k = Math.min(c, m, y);

    if (k === 1) return { c: 0, m: 0, y: 0, k: 1 };

    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    };
  }

  hexToCmyk(hex: string): CMYKColor {
    hex = hex.replace("#", "");

    if (!hex || !/^[0-9A-Fa-f]{3,6}$/.test(hex)) {
      return { c: 0, m: 0, y: 0, k: 0 };
    }

    let paddedHex = hex;
    if (hex.length < 6) {
      paddedHex = hex.padEnd(6, "0");
    }

    const r = parseInt(paddedHex.slice(0, 2), 16);
    const g = parseInt(paddedHex.slice(2, 4), 16);
    const b = parseInt(paddedHex.slice(4, 6), 16);

    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const k = 1 - Math.max(rNorm, gNorm, bNorm);
    const c = k === 1 ? 0 : (1 - rNorm - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - gNorm - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - bNorm - k) / (1 - k);

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    };
  }

  hslToCmyk({ h, s, l }: HslColor): CMYKColor {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
      g = 0,
      b = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }

    const R = Math.round((r + m) * 255);
    const G = Math.round((g + m) * 255);
    const B = Math.round((b + m) * 255);

    const rNorm = R / 255;
    const gNorm = G / 255;
    const bNorm = B / 255;

    const k = 1 - Math.max(rNorm, gNorm, bNorm);
    const cCmyk = k === 1 ? 0 : (1 - rNorm - k) / (1 - k);
    const mCmyk = k === 1 ? 0 : (1 - gNorm - k) / (1 - k);
    const yCmyk = k === 1 ? 0 : (1 - bNorm - k) / (1 - k);

    return {
      c: Math.round(cCmyk * 100),
      m: Math.round(mCmyk * 100),
      y: Math.round(yCmyk * 100),
      k: Math.round(k * 100),
    };
  }

  cmykToRgb({ c, m, y, k }: CMYKColor): RgbColor {
    c /= 100;
    m /= 100;
    y /= 100;
    k /= 100;

    const r = 255 * (1 - c) * (1 - k);
    const g = 255 * (1 - m) * (1 - k);
    const b = 255 * (1 - y) * (1 - k);

    return {
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b),
    };
  }

  cmykToHex({ c, m, y, k }: CMYKColor): string {
    c /= 100;
    m /= 100;
    y /= 100;
    k /= 100;

    const r = Math.round(255 * (1 - c) * (1 - k));
    const g = Math.round(255 * (1 - m) * (1 - k));
    const b = Math.round(255 * (1 - y) * (1 - k));

    const hex = this.rgbToHex({ r, g, b });

    return hex;
  }
  cmykToHsl({ c, m, y, k }: CMYKColor): HslColor {
    c /= 100;
    m /= 100;
    y /= 100;
    k /= 100;

    const r = 255 * (1 - c) * (1 - k);
    const g = 255 * (1 - m) * (1 - k);
    const b = 255 * (1 - y) * (1 - k);

    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (delta !== 0) {
      if (max === rNorm) {
        h = ((gNorm - bNorm) / delta) % 6;
      } else if (max === gNorm) {
        h = (bNorm - rNorm) / delta + 2;
      } else {
        h = (rNorm - gNorm) / delta + 4;
      }

      h = Math.round(h * 60);
      if (h < 0) h += 360;

      s = delta / (1 - Math.abs(2 * l - 1));
    }

    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }
}
