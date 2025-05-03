import "./Alert.scss";
import { useSelector } from "react-redux";

const Alert = () => {
  const { visb, message, status } = useSelector((state) => state.alert);

  return (
    <div>
      {visb && (
        <div
          style={
            status === "success"
              ? { backgroundColor: "#4caf50" }
              : { backgroundColor: "darkred" }
          }
          className="alertPopUp"
        >
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
