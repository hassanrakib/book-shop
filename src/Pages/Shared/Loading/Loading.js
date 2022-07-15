import loadingIcon from "../../../icons/loading.png";
const Loading = ({ className }) => {
  return (
    <img
      className={`animate-spin ${className}`}
      src={loadingIcon}
      alt="loading-icon"
    />
  );
};

export default Loading;
