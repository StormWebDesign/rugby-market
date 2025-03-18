import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../features/filter/filterSlice";
import { catTypes } from "@/data/rugbyTypes"; // Import Rugby Types

const RugbyTypes = () => {
  const { jobList } = useSelector((state) => state.filter) || {};
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState(jobList.category || "");

  useEffect(() => {
    setSelectedType(jobList.category);
  }, [jobList]);

  const handleRugbyTypeChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    dispatch(addCategory(value));
  };

  return (
    <>
      <select className="form-select" value={selectedType} onChange={handleRugbyTypeChange}>
        <option value="">Choose a Rugby Type</option>
        {catTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      <span className="icon flaticon-briefcase"></span>
    </>
  );
};

export default RugbyTypes;
