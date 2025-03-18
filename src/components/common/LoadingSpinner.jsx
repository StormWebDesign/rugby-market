import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <FontAwesomeIcon icon={faSpinner} spin size="3x" className="loading-spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
