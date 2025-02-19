import AddPortfolio from "./AddPortfolio";
import Awards from "./Awards";
import PlayingClubHistory from "./PlayingClubHistory";
import Experiences from "./Experiences";
import SkillsMultiple from "./SkillsMultiple";

const index = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="default-form" onClick={handleSubmit}>
      <div className="row">

        <div className="form-group col-lg-12 col-md-12">
          <PlayingClubHistory />
          {/* <!-- Resume / PlayingClubHistory --> */}

          <Experiences />
          {/* <!-- Resume / Work & Experience --> */}
        </div>
        {/* <!--  education and word-experiences --> */}

        <div className="form-group col-lg-6 col-md-12">
          <AddPortfolio />
        </div>
        {/* <!-- End more portfolio upload --> */}

        <div className="form-group col-lg-12 col-md-12">
          {/* <!-- Resume / Awards --> */}
          <Awards />
        </div>
        {/* <!-- End Award --> */}

        <div className="form-group col-lg-6 col-md-12">
          <label>Skills </label>
          <SkillsMultiple />
        </div>
        {/* <!-- Multi Selectbox --> */}

        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
        {/* <!-- Input --> */}
      </div>
      {/* End .row */}
    </form>
  );
};

export default index;
