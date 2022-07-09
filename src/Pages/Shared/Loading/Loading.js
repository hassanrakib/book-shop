import loadingIcon from "../../../icons/loading.png";
const Loading = ({ isLarge = true, ...props }) => {
  const { height, width } = props;
  return (
    <div
      className={`${
        isLarge ? "h-screen" : `${height && height} ${width && width}`
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
