import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import DragAndDrop from "../components/DragAndDrop";
import { FaFileImage } from "react-icons/fa";

const ImageColorPicker = () => {
  const { t } = useTranslation();

  const [color, setColor] = useState("#f2f2f2");
  const [image, setImage] = useState<string | undefined>(undefined);

  const [notificationState, setNotificationState] = useState<
    "hidden" | "showing" | "hiding"
  >("hidden");
  const timeoutRef = useRef(0);

  const openEyeDropper = async () => {
    if (!("EyeDropper" in window)) {
      alert("EyeDropper API not supported in this browser.");
      return;
    }

    const eyeDropper = new (window as any).EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    setColor(sRGBHex);
  };

  const removeImage = () => {
    setImage(undefined);
  };

  const copyColor = () => {
    clearTimeout(timeoutRef.current);

    setNotificationState("showing");
    navigator.clipboard.writeText(color);

    timeoutRef.current = setTimeout(() => {
      setNotificationState("hiding");

      timeoutRef.current = setTimeout(() => {
        setNotificationState("hidden");
      }, 300);
    }, 5000);
  };

  const isLightColor = (hex: string): boolean => {
    hex = hex.replace("#", "");

    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luminance > 180;
  };

  return (
    <div className="relative flex flex-wrap min-h-[100dvh] dark:bg-background items-start justify-start max-md:pb-14 px-4 ">
      <div className="flex-[1_1_200px] min-h-[100dvh] max-w-full shadow-md max-sm:min-h-fit bg-card-color dark:bg-card-color flex flex-col gap-8 p-10 pt-[150px] ">
        {notificationState !== "hidden" && (
          <div
            className={`
                    fixed max-sm:text-xs text-sm shadow-lg bg-background text-text-color bottom-28 max-sm:left-24 left-35 rounded-sm p-2 
                    flex items-center justify-start gap-2 z-10
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
        <div className="flex items-start justify-center flex-col">
          <h1 className="text-text-color font-semibold">
            {t("imageColorPicker")}
          </h1>
          <h3 className="text-secondary-text-color">
            {t("imageColorPickerDescription")}
          </h3>
        </div>
        <div className="w-[400px] max-sm:w-[90%] ">
          <DragAndDrop openEyeDropper={openEyeDropper} setImage={setImage} />
        </div>

        <div
          className="shadow-md relative w-[400px] max-sm:w-[90%]  h-[200px] flex items-center justify-center cursor-pointer group"
          style={{ backgroundColor: color }}
          onClick={copyColor}
        >
          <span
            className={`${
              isLightColor(color) ? "text-neutral-600" : "text-neutral-100"
            } font-medium z-9`}
          >
            {color}
          </span>

          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <span className="text-white text-sm">Click to copy color</span>
          </div>
        </div>
        <div className="w-[80%] flex">
          <button
            onClick={removeImage}
            className="hover:scale-105 transition-transform ease-in rounded-sm flex items-center justify-center gap-1 text-sm p-2 cursor-pointer hover: text-secondary-text-color"
          >
            <FaTrash /> {t("removeImage")}
          </button>
        </div>
      </div>
      <div className="flex-[1_1_800px] p-2 max-w-full flex items-center justify-center bg-background relative min-h-[100dvh] ">
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-cover filter blur-xs z-0"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="w-[700px] h-[500px] bg-card-color shadow-sm flex items-center justify-center">
          {!image ? (
            <FaFileImage className="text-4xl text-secondary-text-color" />
          ) : (
            <img
              onClick={openEyeDropper}
              src={image}
              className="z-1 w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageColorPicker;
