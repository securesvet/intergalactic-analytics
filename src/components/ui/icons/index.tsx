import trashCan from "../../../assets/trashCan.svg";
import smile from "../../../assets/smile.svg";
import smileSad from "../../../assets/smile_sad.svg";
import file from "../../../assets/file.svg";
import close from "../../../assets/close.svg";

export const Close = () => {
  return <img src={close} alt="Close" />;
};

export const File = () => {
  return <img src={file} alt="file" />;
};

export const SmileSad = () => {
  return <img src={smileSad} alt="Sad smile face" />;
};

export const Smile = () => {
  return <img src={smile} alt="Smile face" />;
};
export const TrashCan = () => {
  return <img src={trashCan} alt="Trash Can" />;
};

export { default as Loader } from "./Loader/Loader.tsx";
