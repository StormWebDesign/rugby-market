import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../features/filter/filterSlice";
import { catGender } from "@/data/genders"; // Import Gender Options

const GenderFilter = () => {
  const { jobList } = useSelector((state) => state.filter) || {};
  const dispatch = useDispatch();
  const [selectedGender, setSelectedGender] = useState(jobList.category || "");

  useEffect(() => {
    setSelectedGender(jobList.category);
  }, [jobList]);

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setSelectedGender(value);
    dispatch(addCategory(value));
  };

  return (
    <>
      <select className="form-select" value={selectedGender} onChange={handleGenderChange}>
        <option value="">Choose a Gender</option>
        {catGender.map((gender) => (
          <option key={gender.value} value={gender.value}>
            {gender.label}
          </option>
        ))}
      </select>
      <span className="icon flaticon-user"></span>
    </>
  );
};

export default GenderFilter;
