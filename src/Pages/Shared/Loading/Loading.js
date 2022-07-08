import loadingIcon from "../../../icons/loading.png";
const Loading = ({ isLarge = true }) => {
  return (
    <div
      className={`${
        isLarge ? "h-screen" : ""
      } flex items-center justify-center`}
    >
      <img
        className={`${isLarge ? "h-24 w-24" : "h-full"} animate-spin`}
        src={loadingIcon}
        alt="loading-icon"
      />
    </div>
  );
};

export default Loading;
