import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaTrash } from "react-icons/fa";

const ImageColorPicker = () => {
  const { t } = useTranslation();

  const [color, setColor] = useState("#f2f2f2");
  const [image, setImage] = useState<string | undefined>(undefined);

  const [notificationState, setNotificationState] = useState<
    "hidden" | "showing" | "hiding"
  >("hidden");
  const timeoutRef = useRef(0);

  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    acceptedFiles.forEach((acceptedFile) => {
      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result?.toString();
        openEyeDropper();
        setImage(binaryStr);
      };

      reader.readAsDataURL(acceptedFile);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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

  return (
    <div className="relative dark:bg-background min-h-[100dvh] flex items-center justify-center max-md:pt-32 max-md:pb-14">
      {notificationState !== "hidden" && (
        <div
          className={`
                    fixed text-sm shadow-sm bg-card-color text-text-color bottom-32 rounded-sm p-2 
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
      <div
        className="absolute w-full h-full bg-no-repeat bg-center filter blur-sm z-0"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="relative z-9 bg-card-color shadow-sm p-8 flex flex-col items-start justify-start gap-6 w-[50%] min-h-[500px] max-lg:w-[90%] max-md:w-[95%]">
        <div className="flex items-start justify-center flex-col gap-14 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-start justify-center flex-col gap-1">
              <h1 className="text-2xl font-bold text-text-color">
                {t("imageColorPicker")}
              </h1>
              <h3 className="text-sm text-secondary-text-color">
                {t("imageColorPickerDescription")}
              </h3>
            </div>
            {image && (
              <div className="flex items-start justify-center flex-col gap-2">
                <button
                  onClick={removeImage}
                  className="text-secondary-text-color text-sm cursor-pointer flex items-center gap-1"
                >
                  <FaTrash />
                  Remove image
                </button>
              </div>
            )}
          </div>
          {!image && (
            <div className="w-full flex items-center justify-center">
              <div
                className="relative w-[70%] h-[300px] cursor-pointer border-1 border-secondary-text-color border-dotted flex items-center justify-center "
                {...getRootProps()}
              >
                <input {...getInputProps()} placeholder="" className="hidden" />
                <div className="absolute text-text-color pointer-events-none">
                  {t("dragAndDropPlaceHolder")}
                </div>
              </div>
            </div>
          )}

          {image && (
            <div className="flex items-start justify-center">
              <div className="w-full flex items-center justify-center">
                <img
                  onClick={openEyeDropper}
                  className="w-[60%] object-cover"
                  src={image ?? ""}
                  alt="Sample image"
                />
              </div>
              <div
                style={{ backgroundColor: color }}
                onClick={copyColor}
                className="relative w-[20%] h-[100px] flex items-center justify-center cursor-pointer group rounded-sm"
              >
                <span className="text-white font-medium z-10">{color}</span>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <span className="text-white text-sm">
                    Click to copy color
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageColorPicker;
