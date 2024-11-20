import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AppImage } from "../appImage";
import FontAwesome from "../fontAwesome/fontAwesome";

interface LightboxProps extends PropsWithChildren {
  img: string;
  className?: string;
  enlighted?: boolean | null;
  images?: Array<string>;
}

export default function Lightbox({
  img,
  className = "",
  enlighted = null,
  images = [],
}: LightboxProps) {
  const [elemEnlighted, setElemEnlighted] = useState<boolean>(false);
  const [enlightedImg, setEnligthedImg] = useState<string>("");

  const switchOn = useCallback(() => {
    setElemEnlighted(enlighted === null ? true : enlighted);
    setEnligthedImg(img);
  }, [enlighted]);
  const switchOff = useCallback(() => {
    setElemEnlighted(enlighted === null ? false : enlighted);
    setEnligthedImg("");
  }, [enlighted]);

  const goToPrevious = () => {
    const currentIndex = images.indexOf(enlightedImg);
    if (currentIndex > 0) {
      setEnligthedImg(images[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    const currentIndex = images.indexOf(enlightedImg);
    if (currentIndex < images.length - 1) {
      setEnligthedImg(images[currentIndex + 1]);
    }
  };

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        switchOff();
      }

      if (e.key === "ArrowLeft" && images.length > 0) {
        goToPrevious();
      }
      if (e.key === "ArrowRight" && images.length > 0) {
        goToNext();
      }
    };

    if (elemEnlighted && enlightedImg !== "") {
      document.addEventListener("keyup", keyHandler);
    } else {
      document.removeEventListener("keyup", keyHandler);
    }
  }, [elemEnlighted, enlightedImg, switchOff]);
  return (
    <>
      <div onClick={switchOn} className={className}>
        <AppImage src={img} alt="" />
      </div>
      {elemEnlighted && enlightedImg && (
        <div className="lightbox fixed inset-x-0 top-0 h-screen w-screen bg-black/80 flex justify-center items-center gap-5 z-[1000]">
          <div onClick={goToPrevious}>
            <FontAwesome icon="chevronLeft" className="h-10 w-10 fill-white" />
          </div>
          <div className="w-[80%] h-[80%] relative">
            <AppImage
              src={enlightedImg}
              alt=""
              classname="flex justify-center items-center"
            />
            <div
              className="absolute cursor-pointer text-white text-2xl -top-[2rem] right-0"
              onClick={switchOff}
            >
              X
            </div>
          </div>
          <div onClick={goToNext}>
            <FontAwesome icon="chevronRight" className="h-10 w-10 fill-white" />
          </div>
        </div>
      )}
    </>
  );
}
