import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

interface DragAndDropProps {
  openEyeDropper: () => void;
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const DragAndDrop = ({ openEyeDropper, setImage }: DragAndDropProps) => {
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

  const { t } = useTranslation();

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="relative w-[100%] h-[200px] cursor-pointer border-1 border-secondary-text-color border-dotted flex items-center justify-center "
      {...getRootProps()}
    >
      <input {...getInputProps()} placeholder="" className="hidden" />
      <div className="absolute text-text-color pointer-events-none p-4 text-sm">
        {t("dragAndDropPlaceHolder")}
      </div>
    </div>
  );
};

export default DragAndDrop;
