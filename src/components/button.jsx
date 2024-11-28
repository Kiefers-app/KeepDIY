import {
  AddIcon,
  ArrowHeadLeft,
  ArrowLeftSmall,
  SendIcon,
  SmileIcon,
} from "./icons";

export const Button1 = (props) => {
  return (
    <button
      type="button"
      onClick={props.click}
      className="my-2 text-center text-sm sm:text-base w-full bg-[#ff1616] p-2.5 text-white hover:bg-red-600 rounded-xl shadow-md"
    >
      {props.text}
    </button>
  );
};

export const Button2 = (props) => {
  return (
    <button
      onClick={props.click}
      className="my-2 text-center w-full bg-gray-200 p-2.5 text-gray-800 hover:bg-gray-100 rounded-xl"
    >
      {props.text}
    </button>
  );
};

export const ButtonGo = (props) => {
  return (
    <div
      onClick={props.click}
      className="my-2 flex justify-center items-center space-x-1 text-center w-full bg-[#ff1616] p-2.5 text-white hover:bg-red-600 rounded-xl shadow-md"
    >
      <button>{props.text}</button>
      <ArrowLeftSmall w="20" h="20" c="#fff" />
    </div>
  );
};

export const ButtonAdd = (props) => {
  return (
    <div
      onClick={props.click}
      className="my-2 flex justify-center items-center space-x-2.5 text-center w-full bg-[#ff1616] p-2.5 text-white whitespace-nowrap text-sm md:text-base hover:bg-red-600 rounded-xl shadow-md"
    >
      <AddIcon w="18" h="18" c="#fff" />
      <button>{props.text}</button>
    </div>
  );
};

export const ButtonGo2 = (props) => {
  return (
    <div className="my-2 flex justify-center items-center space-x-2 text-center min-w-40 w-40 bg-[#ff1616] py-2.5 px-4 text-white hover:bg-red-600 rounded-xl shadow-md">
      <button>{props.text}</button>
      <ArrowHeadLeft w="20" h="20" c="#fff" />
    </div>
  );
};

export const ButtonGuest = (props) => {
  return (
    <div
      onClick={props.click}
      className="font-medium my-2 flex justify-center items-center space-x-2 text-center w-full bg-gray-200 p-2.5 text-gray-900 hover:bg-gray-300 rounded-xl"
    >
      <SmileIcon w="20" h="20" c="#111827" />
      <button>{props.text}</button>
    </div>
  );
};

export const SendButton = () => {
  return (
    <button className="px-4 cursor-pointer bg-red-50 py-2.5 rounded-xl shadow-xl">
      <SendIcon w="20" h="20" c="#111827" />
    </button>
  );
};

export const CTAButton1 = (props) => {
  return (
    <button className="my-2.5 text-left w-auto bg-red-100 py-2.5 px-4 text-red-800 hover:bg-gray-100 rounded-t-2xl rounded-r-2xl shadow-lg">
      {props.text}
    </button>
  );
};

export const PlainButton = (props) => {
  return (
    <button className="cursor-pointer font-medium text-red-500 mx-2.5">
      {props.text}
    </button>
  );
};

export const ButtonWithIcon = (props) => {
  return (
    <div
      onClick={props.press}
      className="cursor-pointer flex justify-center border border-gray-300 shadow-md items-center space-x-2.5 bg-white text-gray-600 p-2.5 font-normal hover:font-medium rounded-lg"
    >
      {props.children}
      <p>{props.title}</p>
    </div>
  );
};

export const ButtonWithIconGray = (props) => {
  return (
    <div className="cursor-pointer flex justify-center items-center space-x-2.5 bg-gray-200 text-gray-600 p-2.5 font-normal hover:font-medium rounded-lg">
      {props.children}
      <p>{props.title}</p>
    </div>
  );
};

export const LoadingButton = () => {
  return (
    <div className="bg-slate-200 rounded-xl p-2">
      <div className="flex justify-center items-center">
        <div className="border-4 border-t-transparent border-gray-500 animate-spin h-8 w-8 rounded-full"></div>
      </div>
    </div>
  );
};
