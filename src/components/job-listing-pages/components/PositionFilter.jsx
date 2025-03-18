import { useDispatch, useSelector } from "react-redux";
import { addTag } from "../../../features/filter/filterSlice";
import { catPositions } from "@/data/positions"; // Import Positions

const PositionFilter = () => {
  const { jobList } = useSelector((state) => state.filter) || {};
  const dispatch = useDispatch();

  const handlePositionClick = (value) => {
    dispatch(addTag(value)); // Dispatch filter update
  };

  return (
    <ul className="tags-style-one">
      {catPositions.map((position) => (
        <li
          key={position.value}
          className={position.value === jobList.tag ? "active" : ""}
          onClick={() => handlePositionClick(position.value)}
        >
          {position.label}
        </li>
      ))}
    </ul>
  );
};

export default PositionFilter;
