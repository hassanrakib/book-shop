import loadingIcon from "../../../icons/loading.png";
const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <img className="h-24 w-24 animate-spin" src={loadingIcon} alt="loading-icon" />
    </div>
  );
};

export default Loading;