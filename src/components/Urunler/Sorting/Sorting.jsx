import "./Sorting.scss";
import { useDispatch } from "react-redux";
import {
  sortingTheIncProduct,
  sortingTheDecProduct,
} from "../../../redux/slices/productSlice";
const Sorting = () => {
  const dispatch = useDispatch();

  const handleSortChange = (e) => {
    if (e.target.value === "inc") {
      dispatch(sortingTheIncProduct());
    } else if (e.target.value === "dec") {
      dispatch(sortingTheDecProduct());
    }
  };

  return (
    <div className="sorting">
      <select
        onChange={handleSortChange}
        defaultValue={"null"}
        className="select"
        name=""
        id=""
      >
        <option disabled value="null">
          Sırala
        </option>
        <option value="inc">Artan</option>
        <option value="dec">Azalan</option>
      </select>
    </div>
  );
};

export default Sorting;
