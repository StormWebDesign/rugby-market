import CallToActions from "../components/CallToActions";
import RugbyTypes from "../components/RugbyTypes"; // New component for Rugby Types
import GenderFilter from "../components/GenderFilter"; // New component for Gender
import PositionFilter from "../components/PositionFilter"; // New component for Positions
import DatePosted from "../components/DatePosted";
// import DestinationRangeSlider from "../components/DestinationRangeSlider";
// import ExperienceLevel from "../components/ExperienceLevel";
// import JobType from "../components/JobType";
import LocationBox from "../components/LocationBox";
// import SalaryRangeSlider from "../components/SalaryRangeSlider";
import SearchBox from "../components/SearchBox";

const FilterSidebar = () => {
  return (
    <div className="inner-column">
      <div className="filters-outer">
        <button
          type="button"
          className="btn-close text-reset close-filters show-1023"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>

        <div className="filter-block">
          <h4>Search by Keywords</h4>
          <div className="form-group">
            <SearchBox />
          </div>
        </div>

        <div className="filter-block">
          <h4>Location</h4>
          <div className="form-group">
            <LocationBox />
          </div>

          {/* <p>Radius around selected destination</p>
          <DestinationRangeSlider /> */}
        </div>

        <div className="filter-block">
          <h4>Rugby Type</h4>
          <div className="form-group">
            <RugbyTypes />
          </div>
        </div>

        {/* <div className="switchbox-outer">
          <h4>Job Type</h4>
          <JobType />
        </div> */}

        <div className="checkbox-outer">
          <h4>Date Posted</h4>
          <DatePosted />
        </div>

        {/* <div className="checkbox-outer">
          <h4>Experience Level</h4>
          <ExperienceLevel />
        </div> */}

        {/* <div className="filter-block">
          <h4>Salary</h4>
          <SalaryRangeSlider />
        </div> */}

        <div className="filter-block">
          <h4>Gender</h4>
          <div className="form-group">
            <GenderFilter />
          </div>
        </div>

        <div className="filter-block">
          <h4>Position</h4>
          <div className="form-group">
            <PositionFilter />
          </div>
        </div>
      </div>

      <CallToActions />
    </div>
  );
};

export default FilterSidebar;
