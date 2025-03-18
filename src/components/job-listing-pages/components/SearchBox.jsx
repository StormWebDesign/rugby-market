import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKeyword } from "../../../features/filter/filterSlice";

const SearchBox = () => {
    const { jobList } = useSelector((state) => state.filter);
    const [getKeyWord, setKeyWord] = useState(jobList.keyword || "");
    const dispatch = useDispatch();

    // Keyword handler
    const keywordHandler = (e) => {
        const value = e.target.value;
        setKeyWord(value);
        dispatch(addKeyword(value));
    };

    useEffect(() => {
        setKeyWord(jobList.keyword || "");
    }, [jobList]);

    return (
        <>
            <input
                type="text"
                name="listing-search"
                placeholder="Job title, keywords, or club name"
                value={getKeyWord}
                onChange={keywordHandler}
            />
            <span className="icon flaticon-search-3"></span>
        </>
    );
};

export default SearchBox;
