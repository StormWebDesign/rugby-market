import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "../../../features/filter/filterSlice";

const LocationBox = () => {
    const { jobList } = useSelector((state) => state.filter);
    const [getLocation, setLocation] = useState(jobList.location || "");
    const dispatch = useDispatch();

    // Location handler
    const locationHandler = (e) => {
        const value = e.target.value;
        setLocation(value);
        dispatch(addLocation(value)); // Dispatch the filter update
    };

    useEffect(() => {
        setLocation(jobList.location || "");
    }, [jobList]);

    return (
        <>
            <input
                type="text"
                name="listing-location"
                placeholder="City, country, or postcode"
                value={getLocation}
                onChange={locationHandler}
            />
            <span className="icon flaticon-map-locator"></span>
        </>
    );
};

export default LocationBox;
