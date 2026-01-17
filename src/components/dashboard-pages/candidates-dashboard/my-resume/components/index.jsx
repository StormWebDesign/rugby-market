import Education from "./Education";
import Experiences from "./Experiences";
// import AddPortfolio from "./AddPortfolio";
// import Awards from "./Awards";
// import SkillsMultiple from "./SkillsMultiple";

const index = () => {

  return (
     <div className="default-form">
      <div className="row">

        <div className="form-group col-lg-12 col-md-12">
          <Education />
          {/* <!-- Resume / Education --> */}

          <Experiences />
          {/* <!-- Resume / Work & Experience --> */}
        </div>
        {/* <!--  education and word-experiences --> */}

        {/* <div className="form-group col-lg-6 col-md-12">
          <AddPortfolio />
        </div> */}
        {/* <!-- End more portfolio upload --> */}

        {/* <div className="form-group col-lg-12 col-md-12">
          <Awards />
        </div> */}
        {/* <!-- End Award --> */}

        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Skills </label>
          <SkillsMultiple />
        </div> */}
        {/* <!-- Multi Selectbox --> */}

        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
        {/* <!-- Input --> */}
      </div>
      {/* End .row */}
      </div>
  );
};

export default index;
